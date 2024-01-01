export const local = {
  get<T>(key: string): T | null {
    const item = localStorage.getItem(key);
    if (!item) return null;
    return JSON.parse(item);
  },
  set(key: string, value: string[]) {
    const parsedValue = JSON.stringify(value);
    const now = new Date().toISOString();
    localStorage.setItem(key, parsedValue);
    localStorage.setItem("lastUpdated", JSON.stringify(now));
  },
  remove(key: string) {
    localStorage.removeItem(key);
  },
};
