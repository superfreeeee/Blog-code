import styles from './index.module.scss';

import React, { FC } from 'react';
import classNames from 'classnames';
import Setting from '@layouts/Setting';

const App: FC = () => {
  return (
    <div className={classNames(styles.appRoot)}>
      <Setting />
    </div>
  );
};

export default App;
