import { useState } from 'react';
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
): {
  resetValue: () => void;
  setState: (state: Record<string, any>) => void;
  setValue: (value: T) => void;
  timestamp?: Date;
  value?: T;
} => {
  if (isServerSide()) {
    return {
      resetValue: noop,
      setState: noop,
      setValue: noop,
      value: initialValue,
    };
  }

  const [storedValue, setStoredValue] = useState<StorageStructure<T>>(() => {
    const item = safeGetStorageValue<T>(storageType, key);
    return item ? item : { data: initialValue };
  });

  const setState = (state: Record<string, any>) => {
    if (!isObject(storedValue)) {
      return console.error(
        'setState can only be called when the stored value is an object.',
      );
    }
    const ts = new Date();
    const updatedState = Object.assign(storedValue?.data || {}, state);
    setStoredValue({
      data: updatedState as T,
      ts,
    });
    safeSetStorageValue<Record<string, any>>(
      storageType,
      key,
      updatedState,
      ts,
    );
  };

  const resetValue = () => {
    window[storageType].removeItem(key);
  };

  const setValue = (value: T) => {
    const ts = new Date();
    setStoredValue({
      data: value,
      ts,
    });
    safeSetStorageValue<T>(storageType, key, value, ts);
  };

  return {
    resetValue,
    setState,
    setValue,
    timestamp: storedValue?.ts,
    value: storedValue?.data,
  };
};

export const useLocalStorage = <T = StoredData>(
  key: StorageKey,
  initialValue?: T,
) => useStorage('localStorage', key, initialValue);

export const useSessionStorage = <T = StoredData>(
  key: StorageKey,
  initialValue?: T,
) => useStorage('sessionStorage', key, initialValue);
