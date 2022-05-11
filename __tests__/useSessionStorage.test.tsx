import { act, renderHook } from '@testing-library/react-hooks';
import mockdate from 'mockdate';
import { useSessionStorage } from '../src/index';

describe('useSessionStorage hook', () => {
  const key = 'testKey';
  const value = 'testValue';

  beforeEach(() => {
    sessionStorage.clear();
    jest.clearAllMocks();
  });

  afterEach(() => {
    mockdate.reset();
  });

  test('Should access sessionStorage to get stored value', () => {
    const { result } = renderHook(() => useSessionStorage(key));
    expect(sessionStorage.getItem).toHaveBeenCalledWith(key);
    expect(result.current.value).toBeUndefined();
  });

  test('Should set the value to sessionStorage', () => {
    const { result } = renderHook(() => useSessionStorage(key));

    const ts = new Date();
    mockdate.set(ts);

    act(() => {
      result.current.setValue(value);
    });

    const expectedStoredData = JSON.stringify({
      data: value,
      ts,
    });

    expect(sessionStorage.setItem).toHaveBeenCalledWith(
      key,
      expectedStoredData,
    );
    expect(result.current.value).toBe(value);
  });

  test('Should return the default value', () => {
    const { result } = renderHook(() => useSessionStorage(key, value));
    expect(result.current.value).toBe(value);
  });

  test('Should reset the stored value', () => {
    const { result } = renderHook(() => useSessionStorage(key));

    act(() => {
      result.current.setValue(value);
    });

    act(() => {
      result.current.resetValue();
    });

    expect(sessionStorage.removeItem).toHaveBeenCalledWith(key);
    expect(result.current.value).toBeUndefined();
  });

  test('Should merge a new object into existing stored object', () => {
    const { result } = renderHook(() => useSessionStorage(key));

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

  test('Should invalidate a previous version number', () => {
    const ts = new Date();
    const previousStoredData = JSON.stringify({
      data: 'oldStoredData',
      ts,
      version: 1,
    });
    sessionStorage.setItem(key, previousStoredData);

    renderHook(() => useSessionStorage(key, '', 2));

    expect(sessionStorage.removeItem).toHaveBeenCalledWith(key);
  });

  test('Should invalidate a previous version string', () => {
    const ts = new Date();
    const previousStoredData = JSON.stringify({
      data: 'oldStoredData',
      ts,
      version: 'old',
    });
    sessionStorage.setItem(key, previousStoredData);

    renderHook(() => useSessionStorage(key, '', 'new'));

    expect(sessionStorage.removeItem).toHaveBeenCalledWith(key);
  });

  test('Should not invalidate data with the same version number', () => {
    const version = 1;
    const ts = new Date();
    const previousStoredData = JSON.stringify({
      data: 'oldStoredData',
      ts,
      version,
    });
    sessionStorage.setItem(key, previousStoredData);

    renderHook(() => useSessionStorage(key, '', version));

    expect(sessionStorage.removeItem).not.toHaveBeenCalled();
  });

  test('Should not invalidate data with the same version string', () => {
    const version = 'abc';
    const ts = new Date();
    const previousStoredData = JSON.stringify({
      data: 'oldStoredData',
      ts,
      version,
    });
    sessionStorage.setItem(key, previousStoredData);

    renderHook(() => useSessionStorage(key, '', version));

    expect(sessionStorage.removeItem).not.toHaveBeenCalled();
  });
});
