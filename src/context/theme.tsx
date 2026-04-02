import { createContext } from "react";
import useCustomTheme from "../customHooks/theme";

export const ThemeContext = createContext("");

export const ThemeContextProvider = (props: any) => {
  const { theme, isDark, setLight, setDark, toggle } = useCustomTheme();
  return (
    // @ts-ignore
    <ThemeContext.Provider value={{ theme, isDark, setLight, setDark, toggle }}>
      {props.children}
    </ThemeContext.Provider>
  );
};
