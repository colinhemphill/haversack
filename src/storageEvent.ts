export const registerStorageEventHandler = <T>(
  key: string,
  callback: (newValue: StorageStructure<T>) => void,
): typeof window.onstorage => {
  return (window.onstorage = (e: StorageEvent) => {
    const { isTrusted, key: eventKey, newValue } = e;
    if (isTrusted && eventKey === key) {
      if (newValue) {
        const structuredValue = JSON.parse(newValue);
        return callback(structuredValue);
      }
      return callback({});
    }
  });
};
