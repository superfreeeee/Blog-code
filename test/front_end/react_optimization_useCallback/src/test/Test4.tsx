import React from 'react';
import { useInputWithCallback } from '../hooks/useInputs';
import { rec } from '../utils/record';

const Inner = (props) => {
  console.log('render Test4 Inner');
  return <input type="text" onChange={props.onChange} />;
};

const Test4 = () => {
  console.group('render Test4');

  const [name, handleNameChange] = useInputWithCallback();

  rec('Test4', handleNameChange);

  console.groupEnd();
  return (
    <div>
      <h2>Test 4: useCallback 与子组件</h2>
      <h3>name: {name}</h3>
      <Inner onChange={handleNameChange} />
    </div>
  );
};

export default Test4;
