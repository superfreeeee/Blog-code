import styles from './index.module.scss';

import React, { FC } from 'react';

type TSliderDirection = 'vertical' | 'horizantal';

interface ISliderProps {
  direction?: TSliderDirection;
  percent?: number;
}

const Slider: FC<ISliderProps> = ({ direction = 'horizantal', percent = 0 }) => {
  return (
    <div className={styles.slider}>
      <div className={styles.dot} style={{left: `calc(-5px + ${percent}%)`}}></div>
    </div>
  );
};

export default Slider;
