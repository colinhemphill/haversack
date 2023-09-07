export const isServerSide = (): boolean => typeof window === 'undefined';

export const isObject = (obj: unknown): boolean => {
  return !!obj && obj.constructor === Object;
};

export const noop = (): void => undefined;

export const safeGetStorageValue = <T>(
  storageType: StorageType,
  key: string,
): StorageStructure<T> => {
  if (isServerSide()) return {};
  try {
    const value = window[storageType].getItem(key);
    let parsedValue;
    if (value) {
      const { data, version, ts } = JSON.parse(value);
      const timestamp = new Date(ts);
      const parsedVersion =
        typeof version !== 'undefined'
          ? isNaN(Number(version))
            ? version
            : Number(version)
          : undefined;

      parsedValue = {
        data,
        ts: timestamp,
        version: parsedVersion,
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
  version?: Version,
): void => {
  if (isServerSide()) return;
  const timestamp = ts || new Date();
  try {
    const storedValue = JSON.stringify({
      data: value,
      ts: timestamp,
      version,
    });
    window[storageType].setItem(key, storedValue);
  } catch (error) {
    console.error(error);
  }
};
