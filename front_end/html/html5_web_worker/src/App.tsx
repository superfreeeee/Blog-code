import styles from './index.module.scss';

import React from 'react';
import classNames from 'classnames';

import useDocumentTitle from '@hooks/useDocumentTitle';
import Test1 from '@layouts/Test1';
import Test2 from '@layouts/Test2';
import Test3 from '@layouts/Test3';

const App: React.FC<{}> = () => {
  useDocumentTitle('HTML5 Web Worker');

  return (
    <div className={classNames(styles.app)}>
      <div className={styles.container}>
        {/* <Test1 /> */}
        {/* <Test2 /> */}
        <Test3 />
      </div>
    </div>
  );
};

export default App;
