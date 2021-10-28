import classNames from 'classnames';
import React, { FC } from 'react';
import styled from 'styled-components';

export enum IconType {
  Undo = 'bx-undo',
  ArrowDown = 'bx-chevron-down',
}

const I = styled.i<IconProps>`
  ${(props) => props.width && `width: ${props.width}px;`}
  ${(props) =>
    props.height &&
    `
    height: ${props.height}px;
    line-height: ${props.height}px;
  `}
  font-size: ${(props) => props.size}px;
  text-align: center;
`;

interface IconProps {
  type: IconType;
  size?: number;
  width?: number;
  height?: number;
}

const Icon: FC<IconProps> = (props) => {
  const { type, size = 16 } = props;
  return <I className={classNames('bx', type)} {...props} size={size} />;
};

export default Icon;
