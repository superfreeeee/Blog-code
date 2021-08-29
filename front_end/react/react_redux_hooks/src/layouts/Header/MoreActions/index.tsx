import styles from './index.module.scss';

import React, { useCallback } from 'react';
import {
  resetCreator,
  updateTitleCreator,
  updateUserInfoCreator,
  useHeaderActions,
} from '../store';

const MoreActions = () => {
  const updateTitle = useHeaderActions(updateTitleCreator);
  const updateUserInfo = useHeaderActions(updateUserInfoCreator);
  const resetHeader = useHeaderActions(resetCreator);

  const retry = useCallback(() => {
    resetHeader();

    const title = 'React Redux - Hooks';
    for (let i = 1; i < title.length; i++) {
      setTimeout(() => {
        updateTitle(title.substring(0, i));
      }, i * 500);
    }

    setTimeout(() => {
      updateUserInfo({ name: '超悠閒' });
    }, 2500);
  }, []);

  return (
    <div className={styles.more}>
      <button onClick={retry}>重试</button>
    </div>
  );
};

export default MoreActions;
