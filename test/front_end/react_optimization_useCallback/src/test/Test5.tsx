import React, { ChangeEventHandler } from 'react';
import { useInputWithCallback } from '../hooks/useInputs';
import { rec } from '../utils/record';

interface IInnerProps {
  onChange: ChangeEventHandler<HTMLInputElement>;
}

const Inner = React.memo<IInnerProps>((props) => {
  console.log('render Test5 Inner');
  return <input type="text" onChange={props.onChange} />;
});

const Test5 = () => {
  console.group('render Test5');

  const [name, handleNameChange] = useInputWithCallback();

  rec('Test5', handleNameChange);

  console.groupEnd();
  return (
    <div>
      <h2>Test 5: useCallback 与 React.memo 协同</h2>
      <h3>name: {name}</h3>
      <Inner onChange={handleNameChange} />
    </div>
  );
};

export default Test5;
