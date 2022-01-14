import React, { FC } from 'react';
import { useRecoilState, useResetRecoilState } from 'recoil';

import { counterFamily } from '@/state/states';

interface CounterItemProps {
  id: number;
}

const CounterItem: FC<CounterItemProps> = ({ id }) => {
  const counterState = counterFamily(id);
  const [count, setCount] = useRecoilState(counterState);
  const resetCount = useResetRecoilState(counterState);

  return (
    <div>
      <h2>Atom Family - Counter Item({id})</h2>
      <div>count: {count}</div>
      <div>
        <button onClick={() => setCount(count + 1)}>+1</button>
        <button onClick={() => setCount(count + 10)}>+10</button>
        <button onClick={resetCount}>reset</button>
      </div>
    </div>
  );
};

export default CounterItem;
