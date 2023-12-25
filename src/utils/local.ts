export const local = {
  get(key: string): string[] | null {
    const item = localStorage.getItem(key);
    if (!item) return null;
    return JSON.parse(item);
  },
  set(key: string, value: string[]) {
    const parsedValue = JSON.stringify(value);
    localStorage.setItem(key, parsedValue);
  },
  remove(key: string) {
    localStorage.removeItem(key);
  },
};
