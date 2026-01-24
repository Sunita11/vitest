import { useEffect, useState } from "react";

import styles from "./style.module.css";

const AnalogClock = () => {
  const [time, setTime] = useState<number>(Date.now());

  useEffect(() => {
    setInterval(() => {
      setTime(Date.now());
    }, 1000);
  });

  const currentTime = new Date(time);
  return (
    <div className={styles.clockWrapper}>
      <div className={styles.handWrapper}>
        <div className={styles.handinnerWrapper}>
          <span
            className={styles.second}
            style={{
              transform: `rotateZ(${currentTime.getSeconds() * 6}deg)`,
            }}
          ></span>
          <span
            className={styles.minutes}
            style={{
              transform: `rotateZ(${currentTime.getMinutes() * 6}deg)`,
            }}
          ></span>
          <span
            className={styles.hours}
            style={{
              transform: `rotateZ(${currentTime.getHours() * 10}deg)`,
            }}
          ></span>
        </div>
      </div>
      <span></span>
    </div>
  );
};

export default AnalogClock;
