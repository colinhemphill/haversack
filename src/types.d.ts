type StorageType = 'localStorage' | 'sessionStorage';

type StorageKey = string;

type StoredData = string | number | any[] | Record<string, any>;

interface StorageStructure<T> {
  data?: T;
  ts?: Date;
}
