import React, { FC } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

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
      <h1>favicon test</h1>
    </AppRoot>
  );
};

export default App;
