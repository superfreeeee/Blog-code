import ElementStyle from '../general/ElementStyle'
import LineProps from '../general/LineProps'
import { concatStyles } from '../utils/style'
import SVGElement from './Element'

export default class SVGLine implements SVGElement {
  x1: number
  y1: number
  x2: number
  y2: number
  style: ElementStyle

  constructor(props: LineProps) {
    this.x1 = props.x1 || 0
    this.y1 = props.y1 || 0
    this.x2 = props.x2 || 0
    this.y2 = props.y2 || 0
    this.style = props.style || {}
  }

  render() {
    const { x1, x2, y1, y2, style } = this
    const props = `x1="${x1}" x2="${x2}" y1="${y1}" y2="${y2}"`
    return `<line ${props} style="${concatStyles(style)}"/>`
  }
}
