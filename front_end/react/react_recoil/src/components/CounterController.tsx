import React from 'react';
import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil';

import { counterState } from '@/state/states';
import styled from 'styled-components';

const CounterControllerWrapper = styled.div`
  button {
    padding: 5px 10px;
    border: 0;
    border-radius: 5px;
    box-shadow: 0 3px 3px gray;

    & + button {
      margin-left: 10px;
    }
  }
`;

const CounterController = () => {
  const [count, setCount] = useRecoilState(counterState);

  const increment = () => {
    setCount(count + 1);
  };

  const reset = useResetRecoilState(counterState);

  const setCount2 = useSetRecoilState(counterState);
  const addTen = () => setCount2(count + 10);

  return (
    <CounterControllerWrapper>
      <h3>Counter controller</h3>
      <div>
        <button onClick={increment}>+1</button>
        <button onClick={addTen}>+10</button>
        <button onClick={reset}>Reset</button>
      </div>
    </CounterControllerWrapper>
  );
};

export default CounterController;
