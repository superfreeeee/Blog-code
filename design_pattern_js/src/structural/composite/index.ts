import { Component, Composite, Leaf } from './components'

const root = new Composite()

root.children.push(new Leaf())

const child2 = new Composite()
child2.children.push(new Leaf())
child2.children.push(new Leaf())
child2.children.push(new Composite())
root.children.push(child2)

root.children.push(new Leaf())

// root {
//   child1,
//   child2: {
//     grandson1,
//     grandson2,
//     grandson3
//   },
//   child3
// }

function operation(component: Component) {
  component.operation()
}

operation(root)
