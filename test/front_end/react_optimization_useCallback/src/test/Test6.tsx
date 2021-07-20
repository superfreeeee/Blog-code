import React, { ChangeEventHandler, useMemo } from 'react';
import { useInputWithCallback } from '../hooks/useInputs';
import { rec } from '../utils/record';

interface IInnerProps {
  onChange: ChangeEventHandler<HTMLInputElement>;
}

const Inner = (props: IInnerProps) => {
  console.log('render Test6 Inner');
  return <input type="text" onChange={props.onChange} />;
};

const Test6 = () => {
  console.group('render Test6');

  const [name, handleNameChange] = useInputWithCallback();

  rec('Test6', handleNameChange);

  console.groupEnd();
  return (
    <div>
      <h2>Test 6: useMemo 实现局部刷新</h2>
      <h3>name: {name}</h3>
      {useMemo(
        () => (
          <Inner onChange={handleNameChange} />
        ),
        [handleNameChange]
      )}
    </div>
  );
};

export default Test6;
