import styles from './index.module.scss';

import React, { useEffect } from 'react';
import {
  IHeaderState,
  updateTitleCreator,
  useHeaderActions,
  useHeaderSelector,
} from '../store';

const Title = () => {
  const title = useHeaderSelector((state: IHeaderState) => state.title);

  const updateTitle = useHeaderActions(updateTitleCreator);

  useEffect(() => {
    const title = 'React Redux - Hooks';
    let n = 0;
    for (let i = 0; i < title.length; i++) {
      const nextChar = title.charAt(i);
      if (nextChar === ' ') {
        continue;
      }
      setTimeout(() => {
        updateTitle(title.substring(0, i + 1));
      }, n * 500);
      n++;
    }
  }, []);

  return <h1 className={styles.title}>{title}</h1>;
};

export default Title;
