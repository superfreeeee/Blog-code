import React, { MouseEvent, useCallback, useEffect, useRef, useState } from 'react';
import useMount from '@youxian/utils/lib/hooks/lifecycle/useMount';

import {
  AlphaPillar,
  ArrowDown,
  ColorBox,
  ColorPanel,
  ColorPanelDot,
  Container,
  HuePillar,
  InputControl,
  MemorizedColors,
  NoColor,
  PickerBox,
  PickerPanel,
  PickerPanelWrapper,
} from './styles';
import useDocumentEvent from '@hooks/useDocumentEvent';
import useColorPanel from './hooks/useColorPanel';

const ColorPicker = () => {
  const [color, setColor] = useState('#fff');
  const [showPanel, setShowPanel] = useState(true);

  const handleBoxClick = (e) => {
    console.log('focus', e.target);
    e.target.focus();
    setShowPanel(!showPanel);
  };

  const handleBoxBlur = () => {
    console.log('handleBoxBlur', showPanel);
    showPanel && setShowPanel(false);
  };

  const colorPanelRef = useRef<HTMLCanvasElement>(null);

  useMount(() => {
    if (colorPanelRef.current) {
      const ctx = colorPanelRef.current.getContext('2d');
      ctx.fillStyle = 'gray';
      ctx.fillRect(0, 0, 300, 200);
    }
  });

  const [panelDotPos, setPanelDotPos] = useState([0, 0]);

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

  // const [color, ColorPanelEl] = useColorPanel();

  return (
    <Container>
      <PickerBox onClick={handleBoxClick} onBlur={handleBoxBlur}>
        {color ? <ArrowDown /> : <NoColor>&times;</NoColor>}
      </PickerBox>
      {showPanel && (
        <PickerPanel>
          <PickerPanelWrapper>
            <ColorPanel
              onClick={setColorPanelDotPos}
              onMouseDown={onColorPanelMouseDown}
              // onMouseMove={onColorPanelMouseMove}
            >
              <canvas ref={colorPanelRef} width="300" height="200"></canvas>
              <ColorPanelDot style={{ left: `${panelDotPos[0]}px`, top: `${panelDotPos[1]}px` }} />
            </ColorPanel>
            <div>
              <HuePillar>hue pillar</HuePillar>
              <AlphaPillar>alpha pillar</AlphaPillar>
            </div>
          </PickerPanelWrapper>
          <InputControl>
            <input type="text" />
            <button>清空</button>
            <button>确定</button>
          </InputControl>
          <MemorizedColors>
            <ColorBox />
            <ColorBox />
          </MemorizedColors>
        </PickerPanel>
      )}
      <button onClick={() => setColor(color ? '' : '#fff')} style={{ margin: '20px 0' }}>
        toggle
      </button>
    </Container>
  );
};

export default ColorPicker;
