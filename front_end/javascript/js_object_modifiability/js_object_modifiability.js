// // 'use strict'
let obj = {
  id: 0,
  name: 'John'
}
console.log(Object.getOwnPropertyDescriptor(obj, 'id'))
// Object.freeze(obj)
// // obj.age = 10
// // delete obj.id
// // obj.name = 'Sandy'
// // obj.__proto__ = Function
// console.log(obj.__proto__)
// console.log(obj)
// console.log(Object.getOwnPropertyDescriptor(obj, 'id'))
// console.log(Object.isFrozen(obj))

// Object.seal(obj)
// Object.defineProperty(obj, 'name', {
//   get() {
//     return this.name
//   },
//   set(newName) {
//     this.name = newName
//   }
// })
// console.log(obj)
// console.log(Object.getOwnPropertyDescriptor(obj, 'id'))

Object.preventExtensions(obj)
// obj.age = 123
// delete obj.id
// Object.defineProperty(obj, 'age', {
//   enumerable: true,
//   value: 18
// })
Object.defineProperty(obj, 'name', {
  get() {
    return this.name
  },
  set(newName) {
    this.name = newName
  }
})
console.log(obj)
console.log(Object.getOwnPropertyDescriptor(obj, 'id'))
