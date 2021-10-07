import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';

const Thing = styled.div`
  && {
    color: blue;
  }
`;

const GlobalStyle = createGlobalStyle`
  div${Thing} {
    color: red;
  }
`;

const Sample10 = () => {
  return (
    <div>
      <GlobalStyle />
      <Thing>I'm blue, da ba dee da ba daa</Thing>
    </div>
  );
};

export default Sample10;
