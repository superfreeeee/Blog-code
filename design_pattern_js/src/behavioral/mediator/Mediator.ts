import { log } from '../../utils/console'
import {
  Colleague,
  Colleague1,
  Colleague2,
  Colleague3,
} from './colleagues'

export default class Mediator {
  colleague1: Colleague1
  colleague2: Colleague2
  colleague3: Colleague3

  constructor(c1: Colleague1, c2: Colleague2, c3: Colleague3) {
    this.colleague1 = c1
    this.colleague2 = c2
    this.colleague3 = c3
  }

  colleagueChanged(colleague: Colleague): void {
    log('passing message by mediator')
    if (colleague instanceof Colleague1) {
      const invoker = 'colleague1'
      this.colleague2.receive(invoker)
      this.colleague3.receive(invoker)
    } else if (colleague instanceof Colleague2) {
      const invoker = 'colleague2'
      this.colleague1.receive(invoker)
      this.colleague3.receive(invoker)
    } else if (colleague instanceof Colleague3) {
      const invoker = 'colleague3'
      this.colleague1.receive(invoker)
      this.colleague2.receive(invoker)
    } else {
      throw new Error('unknown Colleague type')
    }
  }
}
