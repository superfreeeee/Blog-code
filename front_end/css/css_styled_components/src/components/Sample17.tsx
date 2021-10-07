import React, { useRef } from 'react';
import styled from 'styled-components';

import { useMount } from '@youxian/utils';

const Input = styled.input`
  padding: 0.5em;
  margin: 0.5em;
  color: palevioletred;
  background: papayawhip;
  border: none;
  border-radius: 3px;
`;

const Sample17 = () => {
  const inputRef = useRef(null);

  useMount(() => {
    console.log('[Sample17] inputRef.current', inputRef.current);
  });

  return (
    <div>
      <Input
        ref={inputRef}
        placeholder="Hover to focus!"
        onMouseEnter={() => {
          inputRef.current.focus();
        }}
      />
    </div>
  );
};

export default Sample17;
