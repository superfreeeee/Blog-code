import styles from './index.module.scss';

import React, { FC } from 'react';
import classNames from 'classnames';

export enum EIconType {
  Play = 'icon-play',
  Pause = 'icon-pause',
}

interface IIconProps {
  type: EIconType;
  className?: string;
  onClick?: () => void;
}

const Icon: FC<IIconProps> = ({ type, className, onClick }) => {
  return <span className={classNames(styles.icon, styles[type], className)} onClick={onClick}></span>;
};

export default Icon;
