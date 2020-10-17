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
  mergeState: (state: Record<string, any>) => void;
  resetValue: () => void;
  setValue: (value: T) => void;
  timestamp?: Date;
  value?: T;
} => {
  if (isServerSide()) {
    return {
      mergeState: noop,
      resetValue: noop,
      setValue: noop,
      value: initialValue,
    };
  }

  const [storedValue, setStoredValue] = useState<StorageStructure<T>>(() => {
    const item = safeGetStorageValue<T>(storageType, key);
    return item?.data ? item : { data: initialValue };
  });

  const mergeState = (state: Record<string, any>) => {
    const ts = new Date();
    const currentState = isObject(storedValue.data) ? storedValue.data : {};
    const updatedState = Object.assign(currentState, state);
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
    setStoredValue({});
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
    mergeState,
    resetValue,
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
