import React from 'react';
import { useInput } from '../hooks/useInputs';
import { rec } from '../utils/record';

const Inner = (props) => {
  console.log('render Test2 Inner');
  return <input type="text" onChange={props.onChange} />;
};

const Test2 = () => {
  console.group('render Test2');

  const [name, handleNameChange] = useInput();

  rec('Test2', handleNameChange);

  console.groupEnd();
  return (
    <div>
      <h2>Test 2: 基本情况 & 子组件</h2>
      <h3>name: {name}</h3>
      <Inner onChange={handleNameChange} />
    </div>
  );
};

export default Test2;
