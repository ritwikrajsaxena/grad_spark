export function storageGet(key, fallback) {
  try {
    const value = localStorage.getItem(`fgadvising:${key}`);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

export function storageSet(key, value) {
  try {
    localStorage.setItem(`fgadvising:${key}`, JSON.stringify(value));
  } catch {
    // Demo persistence is best-effort only.
  }
}
