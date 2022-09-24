import React, { FC } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import BasicScene from './components/BasicScene';
import DrawLines from './components/DrawLines';

const AppRoot = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
      <BasicScene />
      <DrawLines />
    </AppRoot>
  );
};

export default App;
