import { log } from '../../utils/console'
import { Memento } from './mementos'

export interface State {
  version: string
}

export class Originator {
  state: State = { version: 'v1.0.0' }

  upgrade(level: 'S' | 'M' | 'L' = 'S') {
    const [a, b, c] = this.state.version.split('.')
    let newVersion = this.state.version
    switch (level) {
      case 'S':
        newVersion = `${a}.${b}.${Number(c) + 1}`
        break
      case 'M':
        newVersion = `${a}.${Number(b) + 1}.${c}`
        break
      case 'L':
        newVersion = `${a[0]}${Number(a.substring(1)) + 1}.${b}.${c}`
        break
    }
    this.state.version = newVersion
  }

  createMemento(): Memento {
    log('memorized:', this.state)
    return new Memento(this.state)
  }

  restoreMemento(memento: Memento) {
    this.state = memento.state
  }
}
