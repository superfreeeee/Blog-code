import { log } from '../../utils/console'
import { Subject } from './subjects'

export abstract class Observer {
  subject: Subject | null = null

  observe(subject: Subject) {
    if (this.subject) {
      this.subject.detach(this)
    }
    this.subject = subject
    this.subject.attach(this)
  }

  abstract update(): void
}

export class ConcreteObserver extends Observer {
  static count = 0
  id = ++ConcreteObserver.count

  update() {
    log(`ConcreteObserver(${this.id}) update`)
  }
}
