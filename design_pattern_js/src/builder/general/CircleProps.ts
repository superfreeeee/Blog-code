import ElementStyle from "./ElementStyle";

export default interface CircleProps {
  cx?: number // 圆心 x 坐标
  cy?: number // 圆心 y 坐标
  r?: number // 半径
  style?: ElementStyle // 样式
}
