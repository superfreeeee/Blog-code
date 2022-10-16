import React, { useState } from 'react';
import styles from './index.module.scss';

const Counter = () => {
  const [count, setCount] = useState(0);

  const increment = () => setCount(count + 1);

  return (
    <div className={styles.container}>
      <h2>Counter</h2>
      <div>count: {count}</div>
      <button onClick={increment}>increment</button>
    </div>
  );
};

export default Counter;
