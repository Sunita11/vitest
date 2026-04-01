import React, { type FC, useState } from "react";

type CounterProps = {
  initialCount?: number;
};
const Counter: FC<CounterProps> = (props) => {
  const { initialCount = 0 } = props;
  const [count, setCount] = useState(initialCount);

  const increment = () => {
    setCount(count + 1);
  };
  const decrement = () => {
    setCount(count - 1);
  };
  const reset = () => {
    setCount(0);
  };

  return (
    <div>
      <button name="increment" onClick={increment}>
        Increment
      </button>{" "}
      Count: {count}
      <button name="decrement" onClick={decrement} disabled={count === 0}>
        Decrement
      </button>
      <div data-testid="current-count">{count}</div>
      <button name="reset" onClick={reset}>
        Reset
      </button>
    </div>
  );
};

export default Counter;
