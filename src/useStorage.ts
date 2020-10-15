import { parse, stringify } from 'flatted';
import { useState } from 'react';
import { isServerSide } from './utils';

const useStorage = <T>(
  storageType: StorageType,
  key: StorageKey,
  initialValue?: T,
): {
  value: undefined | T;
  setValue: (value: T) => void;
} => {
  if (isServerSide()) {
    const setValueError = () =>
      console.error(`Cannot set ${storageType} value of ${key} on the server.`);
    return { value: initialValue, setValue: setValueError };
  }

  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window[storageType].getItem(key);
      return item ? parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      window[storageType].setItem(key, stringify(value));
    } catch (error) {
      console.log(error);
    }
  };

  return { value: storedValue, setValue };
};

export const useLocalStorage = <T = StoredData>(
  key: StorageKey,
  initialValue?: T,
) => useStorage('localStorage', key, initialValue);

export const useSessionStorage = <T = StoredData>(
  key: StorageKey,
  initialValue?: T,
) => useStorage('sessionStorage', key, initialValue);
