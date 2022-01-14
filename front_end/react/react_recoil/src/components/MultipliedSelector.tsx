import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import { multipliedNumberFamily } from '@/state/selectors';
import { baseNumberState } from '@/state/states';

const MultipliedSelector = () => {
  const base = useRecoilValue(baseNumberState);
  const [tenTimes, setTenTimes] = useRecoilState(multipliedNumberFamily(10));
  const [hundredTimes, setHundredTimes] = useRecoilState(
    multipliedNumberFamily(100)
  );

  return (
    <div>
      <h2>Selector Family - Multiplier</h2>
      <div>base: {base}</div>
      <div>
        <h3>Multiplier - x10</h3>
        <input
          type="text"
          value={tenTimes}
          onChange={(e) => setTenTimes(Number(e.target.value))}
        />
      </div>
      <div>
        <h3>Multiplier - x100</h3>
        <input
          type="text"
          value={hundredTimes}
          onChange={(e) => setHundredTimes(Number(e.target.value))}
        />
      </div>
    </div>
  );
};

export default MultipliedSelector;
