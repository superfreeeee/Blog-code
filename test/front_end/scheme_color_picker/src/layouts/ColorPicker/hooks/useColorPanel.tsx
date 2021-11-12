import React, { MouseEvent, ReactElement, useCallback, useMemo, useRef, useState } from 'react';
import useMount from '@youxian/utils/lib/hooks/lifecycle/useMount';

import useDocumentEvent from '@hooks/useDocumentEvent';
import { ColorPanel, ColorPanelDot } from '../styles';

const useColorPanel = (): [string, ReactElement, { setColor: (color: string) => void }] => {
  const [color, setColor] = useState('');

  const [panelDotPos, setPanelDotPos] = useState([0, 0]);

  const colorPanelRef = useRef<HTMLCanvasElement>(null);

  useMount(() => {
    if (colorPanelRef.current) {
      const ctx = colorPanelRef.current.getContext('2d');
      ctx.fillStyle = 'gray';
      ctx.fillRect(0, 0, 300, 200);
    }
  });

  const ColorPanelRef = useRef<DOMRect>(null);
  const setColorPanelDotPos = useCallback((e: MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } =
      ColorPanelRef.current || (ColorPanelRef.current = e.currentTarget.getBoundingClientRect());

    const { clientX, clientY } = e;
    const [x, y] = [clientX - left, clientY - top];
    const pos = [Math.max(Math.min(x, width), 0), Math.max(Math.min(y, height), 0)];
    setPanelDotPos(pos);
  }, []);

  const panelMouseMoveRef = useRef(false);
  const onColorPanelMouseDown = (e) => {
    e.preventDefault();
    panelMouseMoveRef.current = true;
    setColorPanelDotPos(e);
  };
  const onColorPanelMouseMove = useCallback((e) => {
    panelMouseMoveRef.current && setColorPanelDotPos(e);
  }, []);
  useDocumentEvent('mousemove', onColorPanelMouseMove);

  const onColorPanelMouseUp = useCallback(() => {
    panelMouseMoveRef.current = false;
  }, []);
  useDocumentEvent('mouseup', onColorPanelMouseUp);

  const ColorPanelEl = useMemo(
    () => (
      <ColorPanel onClick={setColorPanelDotPos} onMouseDown={onColorPanelMouseDown}>
        <canvas ref={colorPanelRef} width="300" height="200"></canvas>
        <ColorPanelDot style={{ left: `${panelDotPos[0]}px`, top: `${panelDotPos[1]}px` }} />
      </ColorPanel>
    ),
    [panelDotPos]
  );

  return [color, ColorPanelEl, { setColor }];
};

export default useColorPanel;
