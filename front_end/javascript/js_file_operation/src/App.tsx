import React, { FC } from 'react';
import classNames from 'classnames';
import styled, { createGlobalStyle } from 'styled-components';

import SelectFile from '@layouts/SelectFile';
import DragFile from '@layouts/DragFile';
import ImageFile from '@layouts/ImageFile';
import FileViewer from '@layouts/FileViewer';

const AppRoot = styled.div`
  overflow: hidden;
  margin-bottom: 40px;
`;

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    min-width: 100vw;
    min-height: 100vh;
    margin: 0;
    font-family: 'Poppins', sans-serif;
  }
`;

const App: FC = () => {
  return (
    <AppRoot>
      <GlobalStyle />
      <SelectFile />
      <DragFile />
      <ImageFile />
      <FileViewer />
    </AppRoot>
  );
};

export default App;
