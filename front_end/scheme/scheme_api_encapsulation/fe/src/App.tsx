import styles from './index.module.scss';

import React from 'react';
import classNames from 'classnames';

import useDocumentTitle from '@hooks/useDocumentTitle';
import V1 from '@layouts/V1';
import V2 from '@layouts/V2';
import V3 from '@layouts/V3';
import V4 from '@layouts/V4';

const App: React.FC<{}> = () => {
  useDocumentTitle('API Encapsulation Scheme');

  return (
    <div className={classNames(styles.app)}>
      <V1 />
      <V2 />
      <V3 />
      <V4 />
    </div>
  );
};

export default App;
