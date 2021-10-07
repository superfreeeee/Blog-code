import styles from './index.module.scss';

import React, { FC } from 'react';
import classNames from 'classnames';

import { useMount } from '@youxian/utils';
import Sample from '@components/Sample';
import ShowCase from '@layouts/ShowCase';

const App: FC = () => {
  useMount(() => {
    document.title = 'Styled Components';
  });

  return (
    <div className={classNames(styles.appRoot)}>
      <h1>Advanced CSS - Styled Components</h1>
      {/* <Sample /> */}
      <ShowCase />
    </div>
  );
};

export default App;
