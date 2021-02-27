// can be replace by https://www.npmjs.com/package/uuid to avoid collisions
export function generateId() {
  return '_' + Math.random().toString(36).substr(2, 9);
};