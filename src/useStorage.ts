import { parse, stringify } from 'flatted';
import { useState } from 'react';

const useStorage = <T>(
  storageType: StorageType,
  key: StorageKey,
  initialValue?: T,
): {
  value: T;
  setValue: (value: T) => void;
} => {
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
