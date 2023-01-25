import React from 'react';
import { actions, useStore } from './store';

const Controller = () => {
  console.log('render Controller');

  return (
    <div>
      <input type="text" onChange={(e) => actions.setName(e.target.value)} />
      <button></button>
      <div>
        <button onClick={actions.inc}>inc</button>
        <button onClick={actions.reset}>reset</button>
      </div>
    </div>
  );
};

const Display = () => {
  const store = useStore();

  console.log('render Display');

  return <div>object: {JSON.stringify(store)}</div>;
};

const DisplayName = () => {
  const { name } = useStore();
  console.log('render DisplayNameOnly');
  return <div>name: {name}</div>;
};

const DisplayLevel2 = () => {
  const {
    deep: {
      inside: { level2 },
    },
  } = useStore();
  console.log('render DisplayLevel2');
  return <div>level2: {level2}</div>;
};

const SimpleStore = () => {
  return (
    <div>
      <h1>SimpleStore</h1>
      <Controller />
      <Display />
      <DisplayName />
      <DisplayLevel2 />
    </div>
  );
};

export default SimpleStore;
