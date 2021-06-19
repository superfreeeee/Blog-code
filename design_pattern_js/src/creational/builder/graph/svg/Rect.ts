import ElementStyle from '../general/ElementStyle'
import RectProps from '../general/RectProps'
import { concatStyles } from '../utils/style'
import SVGElement from './Element'

export default class SVGRect implements SVGElement {
  x: number
  y: number
  rx: number
  ry: number
  width: number
  height: number
  style: ElementStyle

  constructor(props: RectProps) {
    this.x = props.x || 0
    this.y = props.y || 0
    this.rx = props.rx || 0
    this.ry = props.ry || 0
    this.width = props.width || 0
    this.height = props.height || 0
    this.style = props.style || {}
  }

  render() {
    const { x, y, rx, ry, width, height, style } = this
    const props = `x="${x}" y="${y}" rx="${rx}" ry="${ry}" width="${width}" height="${height}"`
    return `<rect ${props} style="${concatStyles(style)}" />`
  }
}
