import moon from "../../assets/themeChangeIcons/moon.png";
import sun from "../../assets/themeChangeIcons/sun.png";
// import { useEffect, useState } from "react";
import { useTheme } from "../../contexts/ThemeContext";
import "./ThemeChange.css";

function ThemeChange() {
  // type Theme = "light" | "dark";
  // const STORAGE_KEY = "theme";

  // const getStoredTheme = (): Theme | null => {
  //   const value = localStorage.getItem(STORAGE_KEY);
  //   return value === "light" || value === "dark" ? value : null;
  // };

  // const getInitialTheme = (): Theme => {
  //   const stored = getStoredTheme();
  //   if (stored) return stored;
  //   return window.matchMedia("(prefers-color-scheme: dark)").matches
  //     ? "dark"
  //     : "light";
  // };

  // const [theme, setTheme] = useState<Theme>(getInitialTheme);

  // useEffect(() => {
  //   document.documentElement.setAttribute("data-theme", theme);
  //   localStorage.setItem(STORAGE_KEY, theme);
  // }, [theme]);

  // useEffect(() => {
  //   const mq = window.matchMedia("(prefers-color-scheme: dark)");
  //   const handleChange = (e: MediaQueryListEvent) => {
  //     if (!localStorage.getItem(STORAGE_KEY))
  //       setTheme(e.matches ? "dark" : "light");
  //   };
  //   mq.addEventListener("change", handleChange);
  //   return () => mq.removeEventListener("change", handleChange);
  // }, []);

  // const toggleTheme = () =>
  //   setTheme((prev) => (prev === "light" ? "dark" : "light"));

  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      className="theme-change"
      aria-pressed={theme === "dark"}
      aria-label="toggle theme"
      onClick={toggleTheme}
    >
      <span className="icon" aria-hidden="true">
        <span className="icon-container">
          <img src={sun} alt="sun" className="icons" />
          <img src={moon} alt="moon" className="icons" />
        </span>
      </span>
    </button>
  );
}

export default ThemeChange;
