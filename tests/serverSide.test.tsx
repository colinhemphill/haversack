/**
 * @jest-environment node
 */
import { act, renderHook } from '@testing-library/react-hooks';
import { useLocalStorage, useSessionStorage } from '../src/index';

describe('useLocalStorage and useSessionStorage hook SSR behavior', () => {
  const key = 'testKey';
  const value = 'testValue';

  beforeEach(() => {
    localStorage.clear();
    jest.resetAllMocks();
  });

  test('Should return the default value on SSR, setValue is a noop', () => {
    const { result } = renderHook(() => useLocalStorage(key, value));

    act(() => {
      result.current.setValue(value);
    });

    expect(localStorage.setItem).not.toHaveBeenCalled();
    expect(result.current.value).toBe(value);
  });

  test('Should return the default value on SSR, setValue is a noop', () => {
    const { result } = renderHook(() => useSessionStorage(key, value));

    act(() => {
      result.current.setValue(value);
    });

    expect(sessionStorage.setItem).not.toHaveBeenCalled();
    expect(result.current.value).toBe(value);
  });
});
