import { Abstraction, RefinedAbstraction } from './abstractions'
import { ImplementorA, ImplementorB } from './implementors'

const implA = new ImplementorA()
const absWithImplA: Abstraction = new RefinedAbstraction(implA)
absWithImplA.operation()

const implB = new ImplementorB()
const absWithImplB: Abstraction = new RefinedAbstraction(implB)
absWithImplB.operation()

// 就好像行为版本的 builder 模式
