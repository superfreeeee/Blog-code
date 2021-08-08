import styles from './index.module.scss';

import React from 'react';
import classNames from 'classnames';

import useDocumentTitle from '@hooks/useDocumentTitle';

const App: React.FC<{}> = () => {
  useDocumentTitle('ReactTemplate');

  return (
    <div className={classNames(styles.app)}>
      <h1>React Template</h1>
      <h3>using Webpack</h3>
      <h3>using Babel</h3>
      <h3>using Typescript</h3>
      <h3>using Sass</h3>
      <h3>using CSS Module</h3>
    </div>
  );
};

export default App;
