import React from 'react';
import styled from 'styled-components';

interface IInputProps {
  size: string;
}

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

const Sample11 = () => {
  return (
    <div>
      <Input placeholder="A small text input" />
      <br />
      <Input placeholder="A bigger text input" size="2em" />
    </div>
  );
};

export default Sample11;
