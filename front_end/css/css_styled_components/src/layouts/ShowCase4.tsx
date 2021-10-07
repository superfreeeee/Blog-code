import React from 'react';
import styled from 'styled-components';

interface IInputProps {
  size?: string;
}

// 4. 传递额外参数
const Input = styled.input.attrs((props: IInputProps) => ({
  // we can define static props
  type: 'text',

  // or we can define dynamic ones
  size: props.size || '1em',
}))<IInputProps>`
  color: palevioletred;
  font-size: 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;

  /* here we use the dynamically computed prop */
  margin: ${(props) => props.size};
  padding: ${(props) => props.size};
`;

const ShowCase4 = () => {
  return (
    <div>
      <Input placeholder="A small text input" />
      <Input placeholder="A bigger text input" size="2em" />
    </div>
  );
};

export default ShowCase4;
