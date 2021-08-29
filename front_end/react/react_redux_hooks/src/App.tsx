import styles from './index.module.scss';

import React, { useEffect } from 'react';
import classNames from 'classnames';

import useDocumentTitle from '@hooks/useDocumentTitle';
import Header from '@layouts/Header';
import { useSelector } from 'react-redux';
import { IAppState, updateTitleCreator, useActions } from './store';

const useTitle = () => {
  const title = useSelector((state: IAppState) => state.title);

  const updateTitle = useActions(updateTitleCreator);

  useEffect(() => {
    updateTitle('React Redux - Hooks');
  }, []);

  useDocumentTitle(title);
};

const App: React.FC<{}> = () => {
  useTitle();

  return (
    <div className={classNames(styles.app)}>
      <Header />
    </div>
  );
};

export default App;
