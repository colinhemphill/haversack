type StorageType = 'localStorage' | 'sessionStorage';

type StorageKey = string;

type StoredData = string | number | unknown[] | Record<string, unknown>;

type Version = number | string;

interface StorageStructure<T> {
  data?: T;
  ts?: Date;
  version?: Version;
}
