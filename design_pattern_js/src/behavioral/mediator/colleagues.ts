import { log } from '../../utils/console'
import Mediator from './Mediator'

export abstract class Colleague {
  mediator?: Mediator

  changed(): void {
    this.mediator?.colleagueChanged(this)
  }
}

export class Colleague1 extends Colleague {
  receive(invoker: string) {
    log(`Colleague1.receive from ${invoker}`)
  }

  broadCast() {
    this.changed()
  }
}

export class Colleague2 extends Colleague {
  receive(invoker: string) {
    log(`Colleague2.receive from ${invoker}`)
  }

  broadCast() {
    this.changed()
  }
}

export class Colleague3 extends Colleague {
  receive(invoker: string) {
    log(`Colleague3.receive from ${invoker}`)
  }

  broadCast() {
    this.changed()
  }
}
