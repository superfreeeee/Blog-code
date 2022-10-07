import React, { useEffect } from 'react';
import {
  amountAdded,
  asyncInitCounter,
  incremented,
} from '../features/counter/counterSlice';
import { useAppDispatch, useAppSelector } from '../hooks';

const Counter = () => {
  const { hasInit, value: count } = useAppSelector((state) => state.counter);
  const dispatch = useAppDispatch();

  const increment = () => {
    dispatch(incremented());
    dispatch(amountAdded(3));
  };

  useEffect(() => {
    dispatch(asyncInitCounter());
  }, []);

  return (
    <div>
      <h2>Counter</h2>
      <div>count: {hasInit ? count : '-'}</div>
      <div>
        <button onClick={increment}>increment</button>
        <button>reset</button>
      </div>
    </div>
  );
};

export default Counter;
