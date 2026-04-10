import { useContext, useEffect } from "react";
import { ThemeContext } from "./../../context/theme";
import styles from "./style.module.css";

const CheckAccessibilty = () => {
  // @ts-ignore
  const { theme, toggle } = useContext(ThemeContext);
  const handleKeyPressHandler = (e: any) => {
    const key = e.key;
    console.log("keypressed: ", key);
    if (key === "1") toggle();
    if (key === "Backspace") {
      window.location.href = "/";
    }
  };
  useEffect(() => {
    document.addEventListener("keydown", handleKeyPressHandler);
    return () => {
      document.removeEventListener("keydown", handleKeyPressHandler);
    };
  }, []);
  return (
    <div>
      <div>check accessibilty</div>
      <div className={styles.asccWrapper}>
        <span>Applied Theme : </span>
        <span>{theme}</span>
      </div>
      <div className={styles.asccWrapper}>
        <div>Change Theme: click the button or press key "1"</div>
        <button onClick={toggle}>
          {theme === "dark" ? "Disable" : "Enable"}
        </button>
      </div>
    </div>
  );
};

export default CheckAccessibilty;
