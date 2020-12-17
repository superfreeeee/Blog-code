// const add = a => b => a + b
// console.log(add(2)(3))

// function hi(a, b, c) {
//   console.log(`Hello my name is ${this.name}`)
//   console.log(`a = ${a}`)
//   console.log(`b = ${b}`)
//   console.log(`c = ${c}`)
// }
// let person = { name: 'John' }
// let a = 1,
//   b = 2,
//   c = 3
// hi = hi.bind(person)
// hi(a, b, c)

// hi.call(person, a, b, c)
// hi.apply(person, [a, b, c])

// let obj = {
//   name: 'John',
//   hi() {
//     console.log(`Hello my name is ${this.name}`)
//   }
// }
// obj.hi()

let obj = {
  name: 'John',
  someFunc() {
    setTimeout(() => {
      console.log(`Hello my name is ${this.name}`)
    }, 1000)
  }
}
obj.someFunc()
