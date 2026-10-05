import { createContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useLocalStorage(
    "app-theme",
    "light",
    (value) => value === "light" || value === "dark"
  );
  const darkMode = theme === "dark";
  function toggleTheme() {
    setTheme((current) => current === "dark" ? "light" : "dark");
  }
  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
