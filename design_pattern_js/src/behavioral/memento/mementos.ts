import { State } from './originators'

export class Memento {
  state: State

  constructor(state: State) {
    this.state = { ...state }
  }

  setState(state: State) {
    this.state = { ...state }
  }
}

export class CareTaker {
  memento: Memento | null = null

  getMemento() {
    return this.memento
  }

  setMemento(memento: Memento) {
    this.memento = memento
  }
}
