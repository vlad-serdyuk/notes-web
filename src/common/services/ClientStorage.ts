export function getItem(key: string) {
  return localStorage.getItem(key);
}

export function saveItem(key: string, item: string) {
  localStorage.setItem(key, item);
}

export function removeItem(key: string) {
  localStorage.removeItem(key);
}