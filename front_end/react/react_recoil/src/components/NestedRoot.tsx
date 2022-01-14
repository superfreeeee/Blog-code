import React, { FC } from 'react';
import {
  RecoilRoot,
  useRecoilBridgeAcrossReactRoots_UNSTABLE,
  useRecoilState,
} from 'recoil';
import styled from 'styled-components';

import { randomNumberState } from '@/state/states';

const useRandomNumber = (): [number, () => void] => {
  const [num, setNum] = useRecoilState(randomNumberState);
  const change = () => setNum(Math.random());

  return [num, change];
};

const Inner: FC<{ inBridge?: boolean }> = ({ inBridge, children }) => {
  const [num, change] = useRandomNumber();

  return (
    <div className={inBridge ? 'bridge' : 'inner'}>
      <h2>Inner State: {num}</h2>
      <button onClick={change}>change</button>
      {children}
    </div>
  );
};

const Outer = () => {
  const [num, change] = useRandomNumber();
  const RecoilBridge = useRecoilBridgeAcrossReactRoots_UNSTABLE();

  return (
    <div className="outer">
      <h2>Outer State: {num}</h2>
      <button onClick={change}>change</button>
      <RecoilRoot>
        <Inner>
          <RecoilBridge>
            <Inner inBridge />
          </RecoilBridge>
        </Inner>
      </RecoilRoot>
    </div>
  );
};

const NestedRootWrapper = styled.div`
  width: 600px;

  .outer {
    background-color: #aaa;
  }
  .inner {
    background-color: #ccc;
  }
  .bridge {
    background-color: #eee;
  }
  .outer,
  .inner,
  .bridge {
    padding: 10px;
    margin-top: 10px;
    border-radius: 20px;
  }
`;

const NestedRoot: FC = () => {
  return (
    <RecoilRoot>
      <NestedRootWrapper>
        <Outer />
      </NestedRootWrapper>
    </RecoilRoot>
  );
};

export default NestedRoot;
