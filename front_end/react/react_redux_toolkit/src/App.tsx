import React, { FC } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import OriginRedux from './components/OriginRedux';
import ToolkitRedux from './components/ToolkitRedux';

const AppRoot = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Poppins', sans-serif;
  }
`;

const App: FC = () => {
  return (
    <AppRoot>
      <GlobalStyle />
      <OriginRedux />
      <ToolkitRedux />
    </AppRoot>
  );
};

export default App;
