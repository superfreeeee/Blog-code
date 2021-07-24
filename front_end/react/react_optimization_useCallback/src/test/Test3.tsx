import React from 'react';
import { useInputWithCallback } from '../hooks/useInputs';
import { rec } from '../utils/record';

const Test3 = () => {
  console.group('render Test3');

  const [name, handleNameChange] = useInputWithCallback();

  rec('Test3', handleNameChange);

  console.groupEnd();
  return (
    <div>
      <h2>Test 3: 使用 useCallback</h2>
      <h3>name: {name}</h3>
      <input type="text" value={name} onChange={handleNameChange} />
    </div>
  );
};

export default Test3;
