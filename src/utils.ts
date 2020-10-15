import { parse, stringify } from 'flatted';

export const isServerSide = (): boolean => typeof window === 'undefined';

export const noop = (): void => undefined;

export const safeGetStorageValue = <T>(
  storageType: StorageType,
  key: string,
): T | undefined => {
  try {
    const value = window[storageType].getItem(key);
    return value ? parse(value) : undefined;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

export const safeSetStorageValue = <T>(
  storageType: StorageType,
  key: string,
  value: T,
): void => {
  try {
    window[storageType].setItem(key, stringify(value));
  } catch (error) {
    console.log(error);
  }
};
