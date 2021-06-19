// import { RectProps } from '../elements/Rect'

import CircleProps from './CircleProps'
import LineProps from './LineProps'
import RectProps from './RectProps'
import TextProps from './TextProps'

export default interface GraphBuilder {
  group: () => this
  groupEnd: () => this
  addRect: (props: RectProps) => this
  addCircle: (props: CircleProps) => this
  addLine: (props: LineProps) => this
  addText: (props: TextProps) => this
  build: () => string
}
