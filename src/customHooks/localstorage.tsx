import { useEffect, useState } from "react";

const useLocalStorage = (key: string, initialValue: string) => {
  const [value, setValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      console.log("item: ", item);
      if (item) return JSON.parse(item);
      return initialValue;
    } catch (e) {
      console.log("error: ", e);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error(e);
    }
  }, [key, value]);

  return [value, setValue];
};

export default useLocalStorage;
