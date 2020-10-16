import { useState } from 'react';
import {
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
  setValue: (value: T) => void;
  timestamp?: Date;
  value?: T;
} => {
  if (isServerSide()) {
    return {
      resetValue: noop,
      setValue: noop,
      value: initialValue,
    };
  }

  const [storedValue, setStoredValue] = useState<StorageStructure<T>>(() => {
    const item = safeGetStorageValue<T>(storageType, key);
    return item ? item : { data: initialValue };
  });

  const mergeValue = () => {};

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
