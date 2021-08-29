import styles from './index.module.scss';

import React from 'react';
import classNames from 'classnames';

import useDocumentTitle from '@hooks/useDocumentTitle';

const App: React.FC<{}> = () => {
  useDocumentTitle('Custom Webpack Loader');

  return (
    <div className={classNames(styles.app)}>
      <h1>Custom Webpack Loader</h1>
    </div>
  );
};

export default App;
