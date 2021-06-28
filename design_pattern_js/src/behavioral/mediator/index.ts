import { group } from '../../utils/console'
import { Colleague1, Colleague2, Colleague3 } from './colleagues'
import Mediator from './Mediator'

const c1 = new Colleague1()
const c2 = new Colleague2()
const c3 = new Colleague3()
const mediator = new Mediator(c1, c2, c3)
c1.mediator = mediator
c2.mediator = mediator
c3.mediator = mediator

group('colleague1.broacast', () => {
  c1.broadCast()
})

group('colleague2.broacast', () => {
  c2.broadCast()
})

group('colleague3.broacast', () => {
  c3.broadCast()
})
