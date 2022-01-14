import React from 'react';
import { useRecoilValue } from 'recoil';

import { counterState } from '@/state/states';

const Counter2 = () => {
  const count = useRecoilValue(counterState);

  return (
    <div>
      <h3>Counter in ComponentB</h3>
      <div>count: {count}</div>
    </div>
  );
};

export default Counter2;
