import styles from './index.module.scss';

import React from 'react';
import classNames from 'classnames';

import useDocumentTitle from '@hooks/useDocumentTitle';
import Test1 from '@layouts/Test1';
import Test2 from '@layouts/Test2';
import Test3 from '@layouts/Test3';

const App: React.FC<{}> = () => {
  useDocumentTitle('Webpack CSS Module');

  return (
    <div className={classNames(styles.app)}>
      <h1>Webpack CSS/SCSS/CSS Module</h1>
      {/* <Test1 /> */}
      {/* <Test2 /> */}
      <Test3 />
    </div>
  );
};

export default App;
