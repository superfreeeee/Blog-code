import styles from './index.module.scss';

import React, { FC, MouseEvent, MutableRefObject, useCallback, useRef, useState } from 'react';
import classNames from 'classnames';

const useAction = (
  bgRef: MutableRefObject<HTMLDivElement>,
  isVertical: boolean,
  onPercentUpdate?: (percent: number, seeking: boolean) => void
) => {
  const [manual, setManual] = useState(false);

  const bgRectRef = useRef<DOMRect>(null);

  const getBgRect = useCallback((): DOMRect => {
    const rect = bgRectRef.current;
    return rect || (bgRectRef.current = bgRef.current.getBoundingClientRect());
  }, []);

  const calcPercent = useCallback(
    (e: MouseEvent<HTMLDivElement>): number => {
      const { x, y, width, height } = getBgRect();
      const { clientX, clientY } = e;

      let percent: number;
      if (isVertical) {
        percent = (height - (clientY - y)) / height;
      } else {
        percent = (clientX - x) / width;
      }
      return Math.min(1, Math.max(0, percent));
    },
    [isVertical]
  );

  const handleClick = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      onPercentUpdate && onPercentUpdate(calcPercent(e), false);
    },
    [onPercentUpdate, calcPercent]
  );

  const handleMouseDown = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      onPercentUpdate && onPercentUpdate(calcPercent(e), true);
      setManual(true);
    },
    [onPercentUpdate, calcPercent]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (manual) {
        onPercentUpdate && onPercentUpdate(calcPercent(e), true);
      }
    },
    [manual, onPercentUpdate, calcPercent]
  );

  const handleMouseUpOrLeave = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (manual) {
        onPercentUpdate && onPercentUpdate(calcPercent(e), false);
        setManual(false);
      }
    },
    [manual, onPercentUpdate, calcPercent]
  );

  return {
    handleClick,
    handleMouseDown,
    handleMouseMove,
    handleMouseUpOrLeave,
  };
};

type TSliderDirection = 'vertical' | 'horizantal';

interface ISliderProps {
  direction?: TSliderDirection;
  percent?: number;
  onPercentUpdate?: (percent: number, seeking: boolean) => void;
}

const Slider: FC<ISliderProps> = ({ direction = 'horizantal', percent = 0, onPercentUpdate }) => {
  const isVertical = direction === 'vertical';
  const verticalStyle = { [styles.vertical]: isVertical };

  const bgRef = useRef<HTMLDivElement>(null);

  const { handleMouseDown, handleMouseMove, handleMouseUpOrLeave } = useAction(bgRef, isVertical, onPercentUpdate);
  const activePercent = percent * 100;

  return (
    <div
      className={classNames(styles.sliderBg, verticalStyle)}
      ref={bgRef}
      // onClick={handleClick}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUpOrLeave}
      onMouseLeave={handleMouseUpOrLeave}
    >
      <div className={classNames(styles.slider, verticalStyle)}>
        <div
          className={classNames(styles.shadow, verticalStyle)}
          style={{ [isVertical ? 'height' : 'width']: `${activePercent}%` }}
        ></div>
        <div
          className={classNames(styles.dot, verticalStyle)}
          style={{ [isVertical ? 'bottom' : 'left']: `calc(-5px + ${activePercent}%)` }}
        ></div>
      </div>
    </div>
  );
};

export default Slider;
