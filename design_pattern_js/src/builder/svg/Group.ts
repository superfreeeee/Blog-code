import SVGElement from './Element'

export default class SVGGroup implements SVGElement {
  parent: SVGGroup | null
  nodes: SVGElement[] = []

  constructor(parent: SVGGroup | null) {
    this.parent = parent
  }

  render() {
    const content = this.nodes.map((node) => node.render()).join('')
    return this.parent
      ? `<g>${content}</g>`
      : `<svg xmlns="http://www.w3.org/2000/svg" version="1.1">${content}</svg>`
  }
}
