import { Element } from './elements'
import { Visitor } from './visitors'

export default class ObjectStructure {
  elements: Element[] = []

  accept(visitor: Visitor) {
    this.elements.forEach((element) => element.accept(visitor))
  }
}
