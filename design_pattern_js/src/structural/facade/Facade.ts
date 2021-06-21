import { log } from '../../utils/console'
import { SubsystemA, SubsystemB, SubsystemC } from './subsystems'

export default class Facade {
  subsystemA?: SubsystemA
  subsystemB?: SubsystemB
  subsystemC?: SubsystemC

  operation1() {
    log('operation1 -> SubsystemA')
    this.subsystemA?.operation()
  }

  operation2() {
    log('operation2 -> SubsystemB')
    this.subsystemB?.operation()
  }

  operation3() {
    log('operation3 -> SubsystemC')
    this.subsystemC?.operation()
  }
}
