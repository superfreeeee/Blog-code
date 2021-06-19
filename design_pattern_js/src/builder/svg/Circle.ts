import CircleProps from '../general/CircleProps'
import ElementStyle from '../general/ElementStyle'
import { concatStyles } from '../utils/style'
import SVGElement from './Element'

export default class SVGCircle implements SVGElement {
  cx: number
  cy: number
  r: number
  style: ElementStyle

  constructor(props: CircleProps) {
    this.cx = props.cx || 0
    this.cy = props.cy || 0
    this.r = props.r || 0
    this.style = props.style || {}
  }

  render() {
    const { cx, cy, r, style } = this
    const props = `cx="${cx}" cy="${cy}" r="${r}"`
    return `<circle ${props} style="${concatStyles(style)}"/>`
  }
}
