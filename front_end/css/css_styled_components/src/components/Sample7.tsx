import React from 'react';
import styled from 'styled-components';

interface IInputProps {
  inputColor?: string;
}

const Input = styled.input<IInputProps>`
  padding: 0.5em;
  margin: 0.5em;
  color: ${(props) => props.inputColor || 'palevioletred'};
  background: papayawhip;
  border: none;
  border-radius: 3px;
`;

export default function Sample7() {
  return (
    <div>
      <Input defaultValue="@probablyup" type="text" />
      <Input defaultValue="@geelen" type="text" inputColor="rebeccapurple" />
    </div>
  );
}
