import React, { FC } from 'react';
import styles from './App.module.scss';

const App: FC = () => {
  return (
    <div className={styles.container}>
      <h1>React App</h1>
      <div>Project build by @youxian/cli</div>
    </div>
  );
};

export default App;
