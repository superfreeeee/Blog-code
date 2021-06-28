import { Visitor } from './visitors'

export interface Element {
  accept(visitor: Visitor): void
}

export class ElementA implements Element {
  static count = 1
  id = ElementA.count++

  accept(visitor: Visitor) {
    visitor.visitElementA(this)
  }
}

export class ElementB implements Element {
  static count = 1
  id = ElementB.count++

  accept(visitor: Visitor) {
    visitor.visitElementB(this)
  }
}
