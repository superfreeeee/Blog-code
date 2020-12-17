// // bad
// const shape = {
//   triangle: 'triangle',
//   square: 'square',
//   rectangle: 'rectangle'
// }
// // good
// const shape = {
//   triangle: Symbol(),
//   square: Symbol(),
//   rectangle: Symbol()
// }

// function area(shape, options) {
//   switch (shape) {
//     case shape.triangle:
//       return 0.5 * options.width * options.height
//     case shape.square:
//       return options.length * options.length
//     case shape.rectangle:
//       return options.width * options.height
//   }
//   return 0
// }

// area(shape.triangle, { width: 50, height: 100 }) // 2500
// area(shape.square, { length: 50 }) // 2500
// area(shape.rectangle, { width: 50, height: 100 }) // 5000

// const top = Symbol()

// class Stack {
//   constructor() {
//     this[top] = -1
//   }
//   pop() {
//     const val = this[this[top]]
//     delete this[this[top]--]
//     return val
//   }
//   push(val) {
//     this[++this[top]] = val
//   }
// }

// const stack = new Stack()
// console.log(stack)
// stack.push(1)
// console.log(stack)
// stack.push(2)
// console.log(stack)
// stack.push(3)
// console.log(stack)
// for(let key in stack) {
//   console.log(`key = ${key}`)
// }
// for(let key in stack) {
//   console.log(`stack[${key}] = ${stack[key]}`)
// }

// let val
// val = stack.pop()
// console.log(val)
// console.log(stack)
// val = stack.pop()
// console.log(val)
// console.log(stack)
// val = stack.pop()
// console.log(val)
// console.log(stack)

// Object.getOwnPropertySymbols
// Object.getOwnPropertyNames

// console.log(Symbol.iterator)
// console.log(Symbol.keyFor(Symbol.iterator))

// class B {
//   [Symbol.hasInstance](other) {
//     return typeof other === "object"
//   }
// }
// console.log('object' instanceof new B())
// console.log({} instanceof new B())

// let arr1 = [3, 4]
// console.log([1, 2].concat(arr1, 5))
// ;[1, 2].concat(arr1, 5)

// arr1[Symbol.isConcatSpreadable] = false
// console.log([1, 2].concat(arr1, 5))
// ;[1, 2].concat(arr1, 5)

// let obj = {
//   0: 3,
//   1: 4,
//   3: 5,
//   [Symbol.iterator]: function* () {
//     for(let i=-3 ; i<0 ; i++) {
//       yield i;
//     }
//   }
// }
// console.log(Array.from(obj))
// console.log([1, 2].concat(Array.from(obj), 5))

// class DelayPromise extends Promise {
//   static get [Symbol.species]() {
//     return Promise
//   }
// }
// const p = new DelayPromise(() => {})
// console.log(p instanceof DelayPromise)
// const p2 = p.then(() => 0)
// console.log(p2 instanceof DelayPromise)
// console.log(p2 instanceof Promise)

// class Matcher {
//   [Symbol.match](string) {
//     return string.indexOf('e')
//   }
// }
// console.log('Hello world'.match(new Matcher))
// 'Hello world'.match(new Matcher)

// const replacement = {}
// replacement[Symbol.replace] = (searchVal, replaceVal) => {
//   let result = ''
//   for(let c of searchVal) {
//     if(c === 'e') {
//       result += '-'
//     } else {
//       result += c
//     }
//   }
//   return result
// }
// console.log('Hello'.replace(replacement, '-'))

// class SearchEngine {
//   constructor(target) {
//     this.target = target
//   }
//   [Symbol.search](s) {
//     return s.indexOf(this.target)
//   }
// }
// console.log('Hello World'.search(new SearchEngine('llo')))
// 'Hello World'.search(new SearchEngine('llo'))

// const obj = {}
// obj[Symbol.iterator] = function* () {
//   for(let i=0 ; i<11 ; i+=5) {
//     yield i
//   }
// }
// for(let val of obj) {
//   console.log(val)
// }

// const obj = {
//   [Symbol.toPrimitive](mode) {
//     switch(mode) {
//       case 'number':
//         return 100
//       case 'string':
//         return '***'
//       case 'default':
//         return '???'
//       default:
//         throw new Error('unexpected mode')
//     }
//   }
// }
// console.log(3 + obj)
// console.log(3 - obj)
// console.log(3 * obj)
// console.log(3 / obj)
// console.log('???' == obj)
// console.log(Number(obj))
// console.log(String(obj))
// console.log('3' + obj)

// const obj = {
//   get [Symbol.toStringTag]() {
//     return '???'
//   }
// }
// console.log(obj)

// console.log(JSON.toString())

// class Obj {
//   foo() {
//     console.log('invoke foo in obj')
//   }
//   bar() {
//     console.log('invoke bar in obj')
//   }
//   get [Symbol.unscopables]() {
//     return {
//       foo: true
//     }
//   }
// }
// function foo() {
//   console.log('invoke foo out of obj')
// }
// function bar() {
//   console.log('invoke bar out of obj')
// }
// with(Obj.prototype) {
//   foo()
//   bar()
// }

// Object.getOwnPropertySymbols()