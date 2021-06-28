import { group, log } from '../../utils/console'
import { ElementA, ElementB } from './elements'
import ObjectStructure from './ObjectStructure'
import { ConcreteVisitorA, ConcreteVisitorB } from './visitors'

const os = new ObjectStructure()
os.elements.push(new ElementA())
os.elements.push(new ElementA())
os.elements.push(new ElementB())
os.elements.push(new ElementA())
os.elements.push(new ElementB())
os.elements.push(new ElementB())
os.elements.push(new ElementB())

const visitorA = new ConcreteVisitorA()
const visitorB = new ConcreteVisitorB()

group('visitorA', () => {
  os.accept(visitorA)
})

group('visitorB', () => {
  os.accept(visitorB)
})
