import styled from 'styled-components';

const PICKER_BOX_WIDTH = 40;
const PICKER_BOX_PADDING = '4px 7px';
const PICKER_BOX_BORDER_COLOR = '#dcdee2';
const PICKER_BOX_INNER_BORDER_COLOR = '#e2dfe2';
const PICKER_BOX_CONTENT_COLOR = '#5e535f';

const PICKER_PANEL_BORDER_COLOR = '#ebeeff';

/**
 * 外容器
 */
export const Container = styled.div`
  position: relative;
  left: 100px;
  top: 100px;
`;

/**
 * 选择器色块
 */
export const PickerBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${PICKER_BOX_WIDTH}px;
  height: ${PICKER_BOX_WIDTH}px;
  padding: ${PICKER_BOX_PADDING};
  border: 1px solid ${PICKER_BOX_BORDER_COLOR};
  border-radius: 4px;
  box-sizing: content-box;
  font-size: 20px;
  color: #535353;
  cursor: pointer;
`;

/**
 * 下拉箭头
 */
export const ArrowDown = styled.span`
  position: relative;
  width: 30px;
  height: 30px;

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 15px;
    display: block;
    width: 12px;
    height: 1px;
    background-color: ${PICKER_BOX_CONTENT_COLOR};
  }

  &::before {
    left: 5px;
    transform: rotate(45deg);
  }

  &::after {
    left: 13px;
    transform: rotate(-45deg);
  }
`;

/**
 * 无颜色框线
 */
export const NoColor = styled.div`
  width: ${PICKER_BOX_WIDTH}px;
  height: ${PICKER_BOX_WIDTH}px;
  font-size: 20px;
  line-height: ${PICKER_BOX_WIDTH}px;
  text-align: center;
  color: ${PICKER_BOX_CONTENT_COLOR};
  border: 1px solid ${PICKER_BOX_INNER_BORDER_COLOR};
  border-radius: 2px;
`;

/**
 * 颜色选择器面板
 */
export const PickerPanel = styled.div`
  max-width: 400px;
  padding: 7px;
  border: 1px solid ${PICKER_PANEL_BORDER_COLOR};
  border-radius: 5px;
  box-sizing: content-box;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  z-index: 10;
`;

export const PickerPanelWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

export const ColorPanel = styled.div`
  position: relative;
  height: 200px;
`;

export const ColorPanelDot = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  background-color: #fff;
  transform: translate(-50%, -50%);

  &::before {
    content: '';
    width: 5px;
    height: 5px;
    position: absolute;
    left: 2.5px;
    top: 2.5px;
    border-radius: 50%;
    background-color: lightgray;
  }
`;

export const AlphaPillar = styled.div``;

export const HuePillar = styled.div``;

export const InputControl = styled.div``;

export const MemorizedColors = styled.div``;

export const ColorBox = styled.div``;
