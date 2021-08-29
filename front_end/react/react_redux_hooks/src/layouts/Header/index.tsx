import styles from './index.module.scss';

import React from 'react';
import { Provider } from 'react-redux';

import { headerContext, store } from './store';
import Title from './Title';
import Avator from './Avator';
import MoreActions from './MoreActions';

const Header = () => {
  return (
    <Provider context={headerContext} store={store}>
      <div className={styles.header}>
        <Title />
        <div className={styles.info}>
          <Avator />
          <MoreActions />
        </div>
      </div>
    </Provider>
  );
};

export default Header;
