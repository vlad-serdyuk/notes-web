interface IStorage {
  getItem: (key: string) => unknown;
  setItem: (key: string, value: unknown) => void;
  putItem: (key: string, value: unknown) => void;
  removeItem: (key: string) => void;
}

let storage: IStorage;

async function getItem(key: string) {     
  return storage.getItem(key);
} 

async function setItem(key: string, value: unknown) {     
  storage.setItem(key, value);
} 

async function removeItem(key: string) {     
  storage.removeItem(key);
}

async function putItem(key: string, value: unknown) {
  const prevRawValue = await getItem(key) as string;
  const prevValue = JSON.parse(prevRawValue);

  let updatedValue = prevValue;
  if (Array.isArray(prevValue)) {
    updatedValue.push(value);
  } else if (typeof prevValue === 'object') {
    updatedValue = { ...prevValue, ...(value as object) };
  }

  await setItem(key, JSON.stringify(updatedValue));
}

const setStorage = (instance: IStorage) => {  
  storage = instance;
}

export { getItem, setItem, putItem, removeItem, setStorage };