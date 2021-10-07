import React, { useContext } from 'react';
import styled, { ThemeProvider, ThemeContext } from 'styled-components';

// 6.1 按布景主题实现样式
const Button = styled.button`
  color: ${(props) => props.theme.fg};
  border: 2px solid ${(props) => props.theme.fg};
  background: ${(props) => props.theme.bg};

  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border-radius: 3px;
`;

// 6.2 主题 context
const theme = {
  fg: 'palevioletred',
  bg: 'white',
};

// 6.3 主题 context（函数形式）
const invertTheme = ({ fg, bg }) => ({
  fg: bg,
  bg: fg,
});

// 6.4 ThemeContext 消费主题
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

// 6.5 ThemeProvider 挂载主题
const ShowCase6 = () => {
  return (
    <ThemeProvider theme={theme}>
      <Inner />
    </ThemeProvider>
  );
};

export default ShowCase6;
