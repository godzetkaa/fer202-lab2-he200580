import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export default function Header() {
  const { darkMode, toggleTheme } = useContext(ThemeContext);
  return (
    <header className="header">
      <div>
        <h1>Mini Movie Manager</h1>
      </div>
      <button onClick={toggleTheme} type="button">
        {darkMode ? "Light" : "Dark"}
      </button>
    </header>
  );
}
