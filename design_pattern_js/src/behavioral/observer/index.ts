import { ConcreteObserver } from './observers'
import { ConcreteSubject } from './subjects'

const subject1 = new ConcreteSubject()
const subject2 = new ConcreteSubject()

const observer1 = new ConcreteObserver()
observer1.observe(subject1)
const observer2 = new ConcreteObserver()
observer2.observe(subject2)
const observer3 = new ConcreteObserver()
observer3.observe(subject2)

subject1.change()
subject2.change()
