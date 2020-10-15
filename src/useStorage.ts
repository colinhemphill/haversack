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
  value: undefined | T;
} => {
  if (isServerSide()) {
    return {
      resetValue: noop,
      setValue: noop,
      value: initialValue,
    };
  }

  const [storedValue, setStoredValue] = useState<T | undefined>(() => {
    const item = safeGetStorageValue<T>(storageType, key);
    return item ? item : initialValue;
  });

  const resetValue = () => {
    window[storageType].removeItem(key);
  };

  const setValue = (value: T) => {
    setStoredValue(value);
    safeSetStorageValue<T>(storageType, key, value);
  };

  return { value: storedValue, resetValue, setValue };
};

export const useLocalStorage = <T = StoredData>(
  key: StorageKey,
  initialValue?: T,
) => useStorage('localStorage', key, initialValue);

export const useSessionStorage = <T = StoredData>(
  key: StorageKey,
  initialValue?: T,
) => useStorage('sessionStorage', key, initialValue);
