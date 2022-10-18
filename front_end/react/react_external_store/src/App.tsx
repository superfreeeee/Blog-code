import React, { FC } from 'react';
import styles from './App.module.scss';
import Main from './components/Main';

const App: FC = () => {
  return (
    <div className={styles.container}>
      <h1>React App</h1>
      <div>Project build by @youxian/cli</div>
      <Main />
    </div>
  );
};

export default App;
