import NetworkConnection from '@components/NetworkConnection';
import React, { FC } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

const AppRoot = styled.div``;

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    width: 100vw;
    height: 100vh;
    margin: 0;
    padding: 40px;
    font-family: 'Poppins', sans-serif;
  }
`;

const App: FC = () => {
  return (
    <AppRoot>
      <GlobalStyle />
      <NetworkConnection />
    </AppRoot>
  );
};

export default App;
