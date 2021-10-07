import React from 'react';
import styled from 'styled-components';

// 1.1 原生标签
const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2em;
  background: papayawhip;
`;

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

interface IButtonProps {
  primary?: boolean;
}

// 1.2 原生标签带参数
const Button = styled.button<IButtonProps>`
  background: ${(props) => (props.primary ? 'palevioletred' : 'white')};
  color: ${(props) => (props.primary ? 'white' : 'palevioletred')};

  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;

const ShowCase1 = () => {
  return (
    <Wrapper>
      <Title>Hello World!</Title>
      <div>
        <Button>Normal</Button>
        <Button primary>Primary</Button>
      </div>
    </Wrapper>
  );
};

export default ShowCase1;
