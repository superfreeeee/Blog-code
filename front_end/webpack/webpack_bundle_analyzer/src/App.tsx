import React, { FC } from 'react';
import classNames from 'classnames';
import styled, { createGlobalStyle } from 'styled-components';

import { useMount } from '@youxian/utils'

const AppRoot = styled.div``;

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
  }

  body {
    min-width: 100vw;
    min-height: 100vh;
    margin: 0;
  }
`;

const App: FC = () => {
  useMount(() => {
    console.log('hello world')
  })

  return (
    <AppRoot>
      <GlobalStyle />
      <h1>Application Front-end</h1>
    </AppRoot>
  );
};

export default App;
