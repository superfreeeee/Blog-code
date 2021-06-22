import Facade from './Facade'
import { SubsystemA, SubsystemB, SubsystemC } from './subsystems'

const facade = new Facade()
facade.subsystemA = new SubsystemA()
facade.subsystemB = new SubsystemB()
facade.subsystemC = new SubsystemC()

facade.operation1()
facade.operation2()
facade.operation3()
