import TextProps from '../general/TextProps'
import SVGElement from './Element'

export default class SVGText implements SVGElement {
  content: string

  constructor(props: TextProps) {
    this.content = props.content || ''
  }

  render() {
    return `<text>${this.content}</text>`
  }
}
