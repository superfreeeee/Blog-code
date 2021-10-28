import React, { FC } from 'react';
import classNames from 'classnames';
import styled, { createGlobalStyle } from 'styled-components';
import { downloadImgByFetch, downloadImgByImage } from '@utils';

const AppRoot = styled.div`
  width: 500px;
  margin: 40px auto 0;
`;

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
    overflow: auto;
  }
`;

const Button = styled.button`
  height: 50px;
  padding: 15px 25px;
  margin-top: 10px;
  background-color: #fff;
  border: 1px solid #000;
  border-radius: 10px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.12);
  font-size: 16px;
  cursor: pointer;

  &:hover {
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.24);
  }

  &:active {
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.36);
  }

  & + & {
    margin-left: 10px;
  }
`;

const App: FC = () => {
  // const imageUrl = 'https://picures.oss-cn-beijing.aliyuncs.com/img/open_gl_learning_3_shader_texture_result.png';
  // const imageUrl = 'http://e.hiphotos.baidu.com/image/pic/item/a1ec08fa513d2697e542494057fbb2fb4316d81e.jpg';
  const imageUrl = 'http://localhost:8080/static/test1.png';

  const download1 = () => {
    downloadImgByFetch(imageUrl, 'sample.png');
  };
  const download2 = () => {
    downloadImgByImage(imageUrl, 'sample.png');
  };

  return (
    <AppRoot>
      <GlobalStyle />
      <h1>JS Download Image</h1>
      <Button onClick={download1}>Download by fetch API</Button>
      <Button onClick={download2}>Download by &lt;img&gt; </Button>
    </AppRoot>
  );
};

export default App;
