import React from 'react';
import { useRecoilValue } from 'recoil';

import { counterState } from '@/state/states';

const Counter = () => {
  const count = useRecoilValue(counterState);

  return (
    <>
      <h2>Atom - Counter</h2>
      <div>
        <h3>Counter in ComponentA</h3>
        <div>count: {count}</div>
      </div>
    </>
  );
};

export default Counter;
