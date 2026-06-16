import type { FC, ReactElement } from "react";
import styles from "./style.module.css";
type DiceProps = {
  count: number;
};
const Dice: FC<DiceProps> = (props): ReactElement => {
  const { count } = props;
  if (!count) return <></>;
  const DotComp = () => <span className={styles.dot}>O</span>;
  const getChild = () => {
    const child: any[] = [];
    switch (count) {
      case 1: {
        const n = (
          <div className={styles.one}>
            <DotComp />
          </div>
        );
        child.push(n);
        break;
      }
      case 2: {
        const n = (
          <div className={styles.two}>
            <div className={styles.twoChild}>
              <DotComp />
            </div>
            <div className={styles.twoChild}>
              <DotComp />
            </div>
          </div>
        );
        child.push(n);
        break;
      }
      case 3: {
        const n = (
          <div className={styles.three}>
            <div className={styles.threeChild}>
              <DotComp />
            </div>
            <div className={styles.threeChild}>
              <DotComp />
            </div>
            <div className={styles.threeChild}>
              <DotComp />
            </div>
          </div>
        );
        child.push(n);
        break;
      }
      case 4: {
        const n = (
          <div className={styles.four}>
            <div className={styles.fourChild}>
              <DotComp />
              <DotComp />
            </div>
            <div className={styles.fourChild}>
              <DotComp />
              <DotComp />
            </div>
          </div>
        );
        child.push(n);
        break;
      }
      case 5: {
        const n = (
          <div className={styles.five}>
            <div className={styles.fiveChild}>
              <DotComp />
              <DotComp />
            </div>
            <div className={styles.fiveChild}>
              <DotComp />
            </div>
            <div className={styles.fiveChild}>
              <DotComp />
              <DotComp />
            </div>
          </div>
        );
        child.push(n);
        break;
      }
      case 6: {
        const n = (
          <div className={styles.six}>
            <div className={styles.sixChild}>
              <DotComp />
              <DotComp />
            </div>
            <div className={styles.sixChild}>
              <DotComp />
              <DotComp />
            </div>
            <div className={styles.sixChild}>
              <DotComp />
              <DotComp />
            </div>
          </div>
        );
        child.push(n);
        break;
      }
      default:
        break;
    }
    return child;
  };
  return <div className={styles.diceOuterWrapper}>{getChild()}</div>;
};

export default Dice;
