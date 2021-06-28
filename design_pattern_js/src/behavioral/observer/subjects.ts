import { log } from '../../utils/console'
import { Observer } from './observers'

export class Subject {
  observers: Observer[] = []

  attach(observer: Observer) {
    if (!this.observers.includes(observer)) {
      this.observers.push(observer)
    }
  }

  detach(observer: Observer) {
    if (this.observers.includes(observer)) {
      this.observers.splice(this.observers.indexOf(observer), 1)
    }
  }

  notify() {
    this.observers.forEach((observer) => observer.update())
  }
}

export class ConcreteSubject extends Subject {
  static count = 0
  id = ++ConcreteSubject.count

  change() {
    log(`ConcreteSubject(${this.id}) changed`)
    this.notify()
  }
}
