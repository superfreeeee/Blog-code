import { log } from '../../utils/console'

export interface Component {
  operation(s?: string): void
}

export class Composite implements Component {
  static count = 0
  id = Composite.count++

  children: Component[] = []

  operation(s = '') {
    log(`${s}Composite ${this.id} operation`)
    this.children.forEach((child) => child.operation(s + '  '))
  }
}

export class Leaf implements Component {
  static count = 0
  id = Leaf.count++

  operation(s = '') {
    log(`${s}Leaf ${this.id} operation`)
  }
}
