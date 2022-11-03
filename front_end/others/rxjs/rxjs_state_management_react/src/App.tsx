import React, { FC } from 'react';
import styles from './App.module.scss';

import ConsumerA from './components/ConsumerA';
import ConsumerB from './components/ConsumerB';

const App: FC = () => {
  return (
    <div className={styles.container}>
      <h1>React App</h1>
      <div>Project build by @youxian/cli</div>
      <ConsumerA />
      <ConsumerB />
    </div>
  );
};

export default App;
