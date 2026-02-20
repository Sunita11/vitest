import React, { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };
  const decrement = () => {
    setCount(count - 1);
  };

  return (
    <div>
      <button onClick={increment}>+</button> Count: {count}
      <button onClick={decrement} disabled={count === 0}>
        -
      </button>
    </div>
  );
};

export default Counter;
