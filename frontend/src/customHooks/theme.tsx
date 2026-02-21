import { useState, useEffect } from "react";

const useCustomTheme = (storageKey: string = "theme") => {
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved === "light" || saved === "dark") return saved;
    } catch {}

    if (typeof window !== undefined && window?.matchMedia) {
      return window.matchMedia(
        // @ts-ignore
        "(prefers-color-scheme: dark)".matches
      )
        ? "dark"
        : "light";
    }
    return "light";
  });

  const isDark = theme === "dark";

  const setLight = () => setTheme("light");
  const setDark = () => setTheme("dark");
  const toggle = () => setTheme((t) => (t === "dark" ? "ligth" : "dark"));

  useEffect(() => {
    try {
      if (window && theme) {
        window.localStorage.setItem(storageKey, theme);
      }
      const root = document.documentElement;
      root.dataset.theme = theme === "dark" ? "dark" : "light";
      root.classList.toggle("dark", theme === "dark");
    } catch {}
  }, [storageKey, theme]);
  return { theme, isDark, setLight, setDark, toggle };
};

export default useCustomTheme;
