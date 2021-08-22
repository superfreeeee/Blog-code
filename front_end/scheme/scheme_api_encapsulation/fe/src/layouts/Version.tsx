import React from 'react';

interface IVersionProps {
  version: string | number;
  hello: () => void;
  increment: () => void;
  reset: () => void;
  success: () => void;
  fail: () => void;
}

const Version: React.FC<IVersionProps> = ({
  version,
  hello,
  increment,
  reset,
  success,
  fail,
}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <h1>Version {version}</h1>
      <button onClick={hello}>/, hello</button>
      <button onClick={increment}>/create, increment</button>
      <button onClick={reset}>/create, reset</button>
      <button onClick={success}>/error, success</button>
      <button onClick={fail}>/error, fail </button>
    </div>
  );
};

export default Version;
