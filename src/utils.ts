export const isServerSide = (): boolean => typeof window === 'undefined';

export const isObject = (obj: any): boolean => {
  return obj && obj.constructor === Object;
};

export const noop = (): void => undefined;

export const safeGetStorageValue = <T>(
  storageType: StorageType,
  key: string,
): StorageStructure<T> => {
  try {
    const value = window[storageType].getItem(key);
    let parsedValue;
    if (value) {
      const { data, ts } = JSON.parse(value);
      const timestamp = new Date(ts);
      parsedValue = {
        data,
        ts: timestamp,
      };
    }
    return parsedValue ? parsedValue : {};
  } catch (error) {
    console.error(error);
    return {};
  }
};

export const safeSetStorageValue = <T>(
  storageType: StorageType,
  key: string,
  value: T,
  ts?: Date,
): void => {
  const timestamp = ts || new Date();
  try {
    const storedValue = JSON.stringify({
      data: value,
      ts: timestamp,
    });
    window[storageType].setItem(key, storedValue);
  } catch (error) {
    console.log(error);
  }
};
