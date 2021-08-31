import { useCallback, useEffect, useState } from 'react';
import {
  isObject,
  isServerSide,
  noop,
  safeGetStorageValue,
  safeSetStorageValue,
} from './utils';

const useStorage = <T>(
  storageType: StorageType,
  key: StorageKey,
  initialValue?: T,
  version?: Version,
): {
  mergeState: (state: Record<string, unknown>) => void;
  resetValue: () => void;
  setValue: (value: T) => void;
  timestamp?: Date;
  value?: T;
  version?: Version;
} => {
  const ssr = isServerSide();

  const [storedValue, setStoredValue] = useState<StorageStructure<T>>(() => {
    if (ssr) return { data: initialValue };

    const item = safeGetStorageValue<T>(storageType, key);

    // invalidate the stored data if the version has changed
    const hasVersion = typeof version !== 'undefined';
    const storedVersionMismatch =
      hasVersion &&
      (typeof item.version === 'undefined' || item.version !== version);
    if (storedVersionMismatch) {
      window[storageType].removeItem(key);
      return { data: initialValue };
    }

    return item?.data ? item : { data: initialValue };
  });

  const mergeState = useCallback(
    (state: Record<string, unknown>) => {
      const ts = new Date();
      const currentState = isObject(storedValue.data) ? storedValue.data : {};
      const updatedState = Object.assign(currentState, state);
      setStoredValue({
        data: updatedState as T,
        ts,
        version,
      });
      safeSetStorageValue<Record<string, unknown>>(
        storageType,
        key,
        updatedState,
        ts,
        version,
      );
    },
    [key, storageType, storedValue.data, version],
  );

  const resetValue = useCallback(() => {
    setStoredValue({});
    window[storageType].removeItem(key);
  }, [key, storageType]);

  const setValue = useCallback(
    (value: T) => {
      const ts = new Date();
      setStoredValue({
        data: value,
        ts,
        version,
      });
      safeSetStorageValue<T>(storageType, key, value, ts, version);
    },
    [key, storageType, version],
  );

  useEffect(() => {
    if (ssr) return;

    const storageEventHandler = (e: StorageEvent) => {
      const { isTrusted, key: eventKey, newValue } = e;
      if (isTrusted && eventKey === key) {
        if (newValue) {
          const structuredValue = JSON.parse(newValue);
          setStoredValue(structuredValue);
        } else {
          setStoredValue({});
        }
      }
    };

    window.addEventListener('storage', storageEventHandler);

    return () => {
      window.removeEventListener('storage', storageEventHandler);
    };
  }, [key, ssr]);

  if (ssr) {
    return {
      mergeState: noop,
      resetValue: noop,
      setValue: noop,
      value: initialValue,
      version,
    };
  }

  return {
    mergeState,
    resetValue,
    setValue,
    timestamp: storedValue?.ts,
    value: storedValue?.data,
    version: storedValue?.version,
  };
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useLocalStorage = <T = StoredData>(
  key: StorageKey,
  initialValue?: T,
  version?: Version,
) => useStorage('localStorage', key, initialValue, version);

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useSessionStorage = <T = StoredData>(
  key: StorageKey,
  initialValue?: T,
  version?: Version,
) => useStorage('sessionStorage', key, initialValue, version);
