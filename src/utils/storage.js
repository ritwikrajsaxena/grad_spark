export function storageGet(key, fallback) {
  try {
    const value = localStorage.getItem(`academicnavigator:${key}`);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

export function storageSet(key, value) {
  try {
    localStorage.setItem(`academicnavigator:${key}`, JSON.stringify(value));
  } catch {
    // Browser persistence is best-effort only.
  }
}
