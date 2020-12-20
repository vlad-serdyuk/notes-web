export function getItem(key: string): string {
  return localStorage.getItem(key);
}

export function saveItem(key: string, item: string): void {
  localStorage.setItem(key, item);
}

export function removeItem(key: string): void {
  localStorage.removeItem(key);
}