import { act, renderHook } from '@testing-library/react-hooks';
import mockdate from 'mockdate';
import { useLocalStorage } from '../src/index';

describe('useLocalStorage hook', () => {
  const key = 'testKey';
  const value = 'testValue';
  const version = 1;

  beforeEach(() => {
    localStorage.clear();
    jest.resetAllMocks();
  });

  afterEach(() => {
    mockdate.reset();
  });

  test('Should access localStorage to get stored value', () => {
    const { result } = renderHook(() => useLocalStorage(key));
    expect(localStorage.getItem).toHaveBeenCalledWith(key);
    expect(result.current.value).toBeUndefined();
  });

  test('Should set the value to localStorage', () => {
    const { result } = renderHook(() => useLocalStorage(key, '', version));

    const ts = new Date();
    mockdate.set(ts);

    act(() => {
      result.current.setValue(value);
    });

    const expectedStoredData = JSON.stringify({
      data: value,
      ts,
      version,
    });

    expect(localStorage.setItem).toHaveBeenCalledWith(key, expectedStoredData);
    expect(result.current.value).toBe(value);
  });

  test('Should return the default value', () => {
    const { result } = renderHook(() => useLocalStorage(key, value));
    expect(result.current.value).toBe(value);
  });

  test('Should reset the stored value', () => {
    const { result } = renderHook(() => useLocalStorage(key));

    act(() => {
      result.current.setValue(value);
    });

    act(() => {
      result.current.resetValue();
    });

    expect(localStorage.removeItem).toHaveBeenCalledWith(key);
    expect(result.current.value).toBeUndefined();
  });

  test('Should merge a new object into existing stored object', () => {
    const { result } = renderHook(() => useLocalStorage(key));

    act(() => {
      result.current.setValue({
        currentHP: 12,
        name: 'Jan Darkmagic',
      });
    });

    act(() => {
      result.current.mergeState({
        currentHP: 34,
        spells: ['Burning Hands', 'Charm Person'],
      });
    });

    const expectedStoredState = {
      currentHP: 34,
      name: 'Jan Darkmagic',
      spells: ['Burning Hands', 'Charm Person'],
    };

    expect(result.current.value).toEqual(expectedStoredState);
  });
});
