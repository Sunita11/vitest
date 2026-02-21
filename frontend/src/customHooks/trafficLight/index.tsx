import { useState, useEffect } from "react";
import styles from "./style.module.css";

const TrafficLight = () => {
  const [active, setActive] = useState(0);
  let timer: number;
  useEffect(() => {
    timer = setInterval(() => {
      setActive((t) => {
        return (t + 1) % 3;
      });
    }, 2000);
    return () => {
      if (timer) clearInterval(timer);
    };
  }, []);
  return (
    <div>
      <h4>Traffic Lights</h4>
      <div className={styles.trafficWrapper}>
        <Light type={0} active={active === 0} />
        <Light type={1} active={active === 1} />
        <Light type={2} active={active === 2} />
      </div>
    </div>
  );
};

const Light = (props: any) => {
  const { type, active } = props;

  return (
    <span
      className={`${styles[`light-${type}`]} ${active && styles.active}`}
    ></span>
  );
};

export default TrafficLight;
