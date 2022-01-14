import React, { FC } from 'react';
import { RecoilRoot } from 'recoil';
import styled, { createGlobalStyle } from 'styled-components';

import AsyncSelector from './components/AsyncSelector';
import Counter from './components/Counter';
import Counter2 from './components/Counter2';
import CounterController from './components/CounterController';
import CounterItem from './components/CounterItem';
import MultipliedSelector from './components/MultipliedSelector';
import NestedRoot from './components/NestedRoot';
import Temperature from './components/Temperature';

const AppRoot = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px;
`;

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Poppins', sans-serif;
    overflow: auto;
  }
`;

const CounterList = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 14px;
`;

const App: FC = () => {
  return (
    <RecoilRoot>
      <AppRoot>
        <GlobalStyle />
        <h1>React state management - Recoil</h1>
        {/* basic atom */}
        <CounterList>
          <div>
            <Counter />
            <Counter2 />
            <CounterController />
          </div>
          {/* <div>
            &gt;&gt;&gt; another scope
            <RecoilRoot>
              <Counter />
              <CounterController />
            </RecoilRoot>
          </div>
          <div>
            &gt;&gt;&gt; another scope (override false)
            <RecoilRoot override={false}>
              <Counter />
              <CounterController />
            </RecoilRoot>
          </div> */}
        </CounterList>
        {/* use selector */}
        <Temperature />
        <AsyncSelector />
        {Array.from({ length: 3 }, (_, i) => (
          <CounterItem key={i} id={i} />
        ))}
        <MultipliedSelector />
        <NestedRoot />
      </AppRoot>
    </RecoilRoot>
  );
};

export default App;
