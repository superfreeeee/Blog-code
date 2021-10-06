import styles from './index.module.scss';

import React, { FC } from 'react';
import classNames from 'classnames';

const App: FC = () => {
  return (
    <div className={classNames(styles.appRoot)}>
      <h1>Application Front-end</h1>
    </div>
  );
};

export default App;
