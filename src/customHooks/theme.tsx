import { useState, useEffect } from "react";

type Theme = "light" | "dark";
const useCustomTheme = (storageKey: string = "theme") => {
  const defaultTheme = () => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved === "light" || saved === "dark") return saved;
    } catch {}

    if (typeof window !== undefined && window?.matchMedia) {
      const preferedColorScheme = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches
        ? "dark"
        : "light";
      return preferedColorScheme;
    }
    return "light";
  };
  console.log("defaultTheme: ", defaultTheme());
  const [theme, setTheme] = useState<Theme>(defaultTheme());

  const isDark = theme === "dark";

  const setLight = () => setTheme("light");
  const setDark = () => setTheme("dark");
  const toggle = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  useEffect(() => {
    try {
      if (window && theme) {
        window.localStorage.setItem(storageKey, theme);
      }
      const root = document.documentElement;
      root.dataset.theme = theme === "dark" ? "dark" : "light";
      root.classList.toggle("dark", theme === "dark");
      root.classList.toggle("light", theme !== "dark");
    } catch {}
  }, [storageKey, theme]);
  return { theme, isDark, setLight, setDark, toggle };
};

export default useCustomTheme;
