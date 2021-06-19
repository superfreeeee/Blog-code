import CircleProps from '../general/CircleProps'
import GraphBuilder from '../general/GraphBuilder'
import LineProps from '../general/LineProps'
import RectProps from '../general/RectProps'
import TextProps from '../general/TextProps'
import SVGCircle from './Circle'
import SVGElement from './Element'
import SVGGroup from './Group'
import SVGLine from './Line'
import SVGRect from './Rect'
import SVGText from './Text'

export default class SVGBuilder implements GraphBuilder {
  currentGroup: SVGGroup = new SVGGroup(null)

  private addElement(node: SVGElement) {
    this.currentGroup.nodes.push(node)
    return this
  }

  group() {
    const group = new SVGGroup(this.currentGroup)
    this.addElement(group)
    this.currentGroup = group
    return this
  }

  groupEnd() {
    this.currentGroup = this.currentGroup.parent || this.currentGroup
    return this
  }

  addRect(props: RectProps) {
    return this.addElement(new SVGRect(props))
  }

  addCircle(props: CircleProps) {
    return this.addElement(new SVGCircle(props))
  }

  addLine(props: LineProps) {
    return this.addElement(new SVGLine(props))
  }

  addText(props: TextProps) {
    return this.addElement(new SVGText(props))
  }

  build() {
    while (this.currentGroup.parent) {
      this.currentGroup = this.currentGroup.parent
    }
    return this.currentGroup.render()
  }
}
