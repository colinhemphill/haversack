import {
  isObject,
  safeGetStorageValue,
  safeSetStorageValue,
} from '../src/utils';

describe('Storage utils', () => {
  test('isObject should correctly identify JS objects', () => {
    const testObject = {
      key: 'value',
    };
    const testString = 'mystring';
    const testNumber = 1234;
    const testFunction = () => null;
    expect(isObject(testObject)).toBeTruthy();
    expect(isObject(testFunction)).toBeFalsy();
    expect(isObject(testString)).toBeFalsy();
    expect(isObject(testNumber)).toBeFalsy();
  });

  test('safeGetStorageValue should retrieve a StorageStructure object', () => {
    const key = 'test';
    const valueToStore = {
      data: 'example',
      ts: new Date(),
    };
    localStorage.setItem(key, JSON.stringify(valueToStore));
    const storedValue = safeGetStorageValue('localStorage', key);
    expect(localStorage.getItem).toHaveBeenCalledWith(key);
    expect(storedValue).toEqual(valueToStore);
  });

  test('safeSetStorageValue should set a StorageStructure object', () => {
    const key = 'test';
    const data = 'example';
    const ts = new Date();
    const expectedValue = {
      data,
      ts,
    };
    safeSetStorageValue('localStorage', key, data, ts);
    expect(localStorage.setItem).toHaveBeenCalled();
    const storedValue = localStorage.getItem(key);
    expect(storedValue).toEqual(JSON.stringify(expectedValue));
  });

  describe('Storage util error states', () => {
    const consoleError = console.error;

    afterEach(() => {
      console.error = consoleError;
    });

    test('safeSetStorageValue should print an error on failure', () => {
      const error = jest.fn();
      console.error = error;
      const circular: { a?: any } = {};
      circular.a = circular;
      safeSetStorageValue('localStorage', 'circular', circular);
      expect(error).toHaveBeenCalledTimes(1);
    });
  });
});
