import React, { useContext } from 'react';
import styled, { ThemeProvider, ThemeContext } from 'styled-components';

// Define our button, but with the use of props.theme this time
const Button = styled.button`
  color: ${(props) => props.theme.fg};
  border: 2px solid ${(props) => props.theme.fg};
  background: ${(props) => props.theme.bg};

  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border-radius: 3px;
`;

// Define our `fg` and `bg` on the theme
const theme = {
  fg: 'palevioletred',
  bg: 'white',
};

// This theme swaps `fg` and `bg`
const invertTheme = ({ fg, bg }) => ({
  fg: bg,
  bg: fg,
});

const Inner = () => {
  const themeCtx = useContext(ThemeContext);

  console.log('[Sample15] theme', themeCtx);

  return (
    <div>
      <Button>Default Theme</Button>
      <ThemeProvider theme={invertTheme}>
        <Button>Inverted Theme</Button>
      </ThemeProvider>
    </div>
  );
};

const Sample15 = () => {
  return (
    <ThemeProvider theme={theme}>
      <Inner />
    </ThemeProvider>
  );
};

export default Sample15;
