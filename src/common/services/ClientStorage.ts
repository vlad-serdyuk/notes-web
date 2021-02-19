interface IStorage {
  getItem: (key: string) => unknown;
  setItem: (key: string, value: unknown) => void;
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

const setStorage = (instance: IStorage) => {
  console.log(instance);
  
  storage = instance;
}

export { getItem, setItem, removeItem, setStorage };