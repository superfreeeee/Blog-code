import { log } from '../utils'

function info(target) {
  target.prototype.greeting = function () {
    console.log(`This is class ${this.name}`)
  }
}

@info
class A {}

const a = new A()
a.name = 'a instance of class A'

console.log('A: ', A)
console.log('a: ', a)
a.greeting()
