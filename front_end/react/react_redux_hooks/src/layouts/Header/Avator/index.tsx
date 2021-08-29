import styles from './index.module.scss';

import React, { useEffect } from 'react';
import {
  IHeaderState,
  updateUserInfoCreator,
  useHeaderActions,
  useHeaderSelector,
} from '../store';

const Avator = () => {
  const userInfo = useHeaderSelector((state: IHeaderState) => state.userInfo);

  const updateUserInfo = useHeaderActions(updateUserInfoCreator);

  useEffect(() => {
    setTimeout(() => {
      updateUserInfo({ name: '超悠閒' });
    }, 2500);
  }, []);

  return (
    <div className={styles.avator}>
      <h3>{userInfo.name}</h3>
    </div>
  );
};

export default Avator;
