import React, { useEffect } from 'react';
import { useInput } from '../hooks/useInputs';
import { rec } from '../utils/record';

const Test1 = () => {
  console.group('render Test1');

  const [name, handleNameChange] = useInput();

  rec('Test1', handleNameChange);

  console.groupEnd();
  return (
    <div>
      <h2>Test 1: 测试基本情况(简单 inline 函数)</h2>
      <h3>name: {name}</h3>
      <input type="text" value={name} onChange={handleNameChange} />
    </div>
  );
};

export default Test1;
