import { log } from '../../utils/console'
import { CareTaker } from './mementos'
import { Originator } from './originators'

const careTaker = new CareTaker()
const originator = new Originator()

log(originator)

originator.upgrade()
log(originator)
careTaker.setMemento(originator.createMemento())

originator.upgrade()
log(originator)

originator.upgrade()
log(originator)

const memo = careTaker.getMemento()
memo && originator.restoreMemento(memo)
log(originator)
