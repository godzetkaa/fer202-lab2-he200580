import { useEffect, useState } from "react";

// Use a fixed storage key for each instance of this hook.
export default function useLocalStorage(key, initialValue, isValid = () => true) {
  const [value, setValue] = useState(() => {
    try {
      const storedValue = localStorage.getItem(key);
      if (storedValue !== null) {
        const parsedValue = JSON.parse(storedValue);
        if (isValid(parsedValue)) return parsedValue;
      }
    } catch {
      // Fall back when saved JSON is invalid or storage is unavailable.
    }
    return initialValue;
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Keep the app usable even when the browser cannot save data.
    }
  }, [key, value]);

  return [value, setValue];
}
