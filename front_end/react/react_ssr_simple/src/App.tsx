import React, { FC } from 'react';
import styles from './App.module.scss';
import Counter from './components/Counter';

const App: FC = () => {
  return (
    <div className={`${styles.container} my-app`}>
      <h1>App</h1>
      <Counter />
    </div>
  );
};

export default App;
