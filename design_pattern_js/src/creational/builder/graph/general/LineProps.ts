import ElementStyle from "./ElementStyle";

export default interface LineProps {
  x1?: number // 起点 x 坐标
  y1?: number // 起点 y 坐标
  x2?: number // 终点 x 坐标
  y2?: number // 终点 y 坐标
  style?: ElementStyle // 样式
}
