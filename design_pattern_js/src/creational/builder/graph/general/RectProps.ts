import ElementStyle from "./ElementStyle";

export default interface RectProps {
  x?: number // x 坐标
  y?: number // y 坐标
  rx?: number // x 方向圆角
  ry?: number // y 方向圆角
  width?: number // 宽度
  height?: number // 高度
  style?: ElementStyle // 样式
}
