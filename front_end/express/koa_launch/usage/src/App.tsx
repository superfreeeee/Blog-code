import styles from './index.module.scss';

import React from 'react';
import classNames from 'classnames';

import useDocumentTitle from '@hooks/useDocumentTitle';
import TestKoaServer from '@layouts/TestKoaServer';

const App: React.FC<{}> = () => {
  useDocumentTitle('ReactTemplate');

  return (
    <div className={classNames(styles.app)}>
      <TestKoaServer />
    </div>
  );
};

export default App;
