import React, { FC } from 'react';
import classNames from 'classnames';
import styled, { createGlobalStyle } from 'styled-components';
import useFullScreen from '@hooks/useFullScreen';

const AppRoot = styled.div`
  background-color: rgb(233, 233, 233);
`;

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
    background-color: rgb(233, 233, 233);
    font-family: 'Poppins', sans-serif;
  }
  
  button + button {
    margin-left: 8px;
  }
`;

const App: FC = () => {
  const [, bodyAction] = useFullScreen();
  const [ref, { requestFullScreen, exitFullScreen, toggleFullScreen, isFullScreen }] = useFullScreen<HTMLDivElement>();

  return (
    <div style={{ height: '100vh', backgroundColor: 'rgb(233, 233, 233)' }}>
      <AppRoot ref={ref}>
        <GlobalStyle />
        <h1>Application Front-end</h1>
        <div>
          <h4>AppRoot</h4>
          <button onClick={requestFullScreen}>Request full screen</button>
          <button onClick={exitFullScreen}>Cancel full screen</button>
          <button onClick={toggleFullScreen}>Toggle full screen({isFullScreen ? 'Cancel' : 'Request'})</button>
        </div>

        <div>
          <h4>Body</h4>
          <button onClick={bodyAction.requestFullScreen}>Request full screen</button>
          <button onClick={bodyAction.exitFullScreen}>Cancel full screen</button>
          <button onClick={bodyAction.toggleFullScreen}>
            Toggle full screen({bodyAction.isFullScreen ? 'Cancel' : 'Request'})
          </button>
        </div>
      </AppRoot>
      <div>Outside AppRoot</div>
    </div>
  );
};

export default App;
