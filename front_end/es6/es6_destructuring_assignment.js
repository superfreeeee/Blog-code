// let array = [1, 2, 3, 4, 5]
// let [a, b, c] = array
// console.log(a)
// console.log(b)
// console.log(c)
// a = 1, b = 2, c = 3

// let [a, ...others] = [1,2,3,4,5]
// console.log(a)
// console.log(others)

// let [a, [b, c, ...d], , e, f] = [1, [2, 3, 4, 5, 6], 7, 8]
// console.log(a)
// console.log(b)
// console.log(c)
// console.log(d)
// console.log(e)
// console.log(f)

// let [a, b,c] = [1,,3]
// console.log(a, b, c)

// let [x = 0, y = 0] = [10]
// console.log(x, y)

// function hi() {
//   console.log('hello')
// }
// let [x = hi()] = [1]
// let [y = hi()] = [undefined]
// console.log(x)
// console.log(y)

// let [x, y = x] = []
// console.log(x)
// console.log(y)

// let [x, y, z] = new Set([1,2,2,1,6])
// console.log([x, y, z])

// function *fibs() {
//   let a = 0
//   let b = 1
//   while(true) {
//     yield a;
//     [a, b] = [b, a+b]
//   }
// }

// let [f0, f1, f2, f3] = fibs()
// console.log([f0, f1, f2, f3])

// let name = 'John'
// let o = {
//   name,
//   hi() {
//     console.log(this.name)
//   }
// }
// o.hi()
// // 等價於
// let o = {
//   name: name,
//   hi: function() {
//     console.log(this.name)
//   }
// }

// let { foo, bar } = { foo: 'foo', bar: 'bar' }
// console.log(foo)
// console.log(bar)

// let { foo: baz } = { foo: 'foo' }
// console.log(foo)
// console.log(baz)

// let foo;
// ({ foo } = { foo: 'foo' })

// let p = {
//   id: 0,
//   info: {
//     name: 'john',
//     age: 18,
//     children: [
//       'Lily',
//       'Bob',
//       'Andy'
//     ]
//   }
// }
// let { id , info: { name, age, children: [kid1, ...otherKids] }} = p
// console.log(id)
// console.log(name)
// console.log(age)
// console.log(kid1)
// console.log(otherKids)

// let { foo = 'uncatch', baz } = {}
// console.log(foo)
// console.log(baz)

// let { foo: baz = 'default baz' } = {}
// console.log(baz)

// let { n = 1, u = 1, zero = 1 } = { n: null, u: undefined, zero: 0 }
// console.log(n)
// console.log(u)
// console.log(zero)

// let { foo: { baz } } = { bar: 'bar' }

// let arr = [1,2,3,4,5]
// let {0: first, [arr.length-1]: last} = arr
// console.log(first)
// console.log(last)

// let [a, b, c] = 'hello'
// console.log([a, b, c])
// let { length: len, 0: firstChar } = 'hello'
// console.log(len)
// console.log(firstChar)

// let { toString: f1, valueOf: f2 } = 1

// console.log(f1 === Object.prototype.toString)
// console.log(f2 === Object.prototype.valueOf)

// let { n } = null
// let { u } = undefined

// function checkPassword({ password: p }) {
//   // rule about p
//   console.log(`password = ${p}`)
//   return true
// }
// let person = {
//   id: 0,
//   name: 'John',
//   password: '12345678',
//   email: '181250003@smail.nju.edu.cn',
//   addres: 'xxx',
//   // ...
// }
// checkPassword(person)

// let a = 1
// ;[[1,2], [3,4]].map(([x, y]) => x + y)

// function distance({x = 0, y = 0} = {}) {
//   return [x, y]
// }
// console.log(distance())
// console.log(distance({}))
// console.log(distance({ x: 10 }))
// console.log(distance({ x: 10, y: 20 }))

// function point2({ x, y } = { x: 0, y: 0 }) {
//   console.log([x, y])
//   return [x, y]
// }
// point2()
// // [ 0, 0 ]
// point2({})
// // [ 0, 0 ]
// point2({ x: 10 })
// // [ 10, 0 ]
// point2({ x: 10, y: 20 })
// // [ 10, 20 ]

// function f1() {
//   let a = 1, b = 2, c = 3
//   return [a, b, c]
// }
// function f2() {
//   return {
//     foo: 'foo',
//     bar: 'bar'
//   }
// }
// let [a, b, c] = f1()
// let { foo, bar } = f2()

// function parse([cmd, ...params]) {
//   console.log(`cmd = ${cmd}, params = ${params}`)
// }
// parse('add 1 2'.split(' '))

// let person = {
//   id: 0,
//   name: 'John',
//   password: '12345678',
//   email: '181250003@smail.nju.edu.cn',
//   addres: 'xxx',
//   // ...
// }
// let { id, name } = person
// console.log(id, name)

// function show({
//   width = 50,
//   height = 50,
//   color = 'blue',
//   fontSize = 30,
//   margin
// }) {
//   console.log({
//     width,
//     height,
//     color,
//     fontSize,
//     margin
//   })
// }
// let square = {
//   width: 100,
//   height: 200,
// }
// show(square)

// let map = new Map()
// map.set('key1', 'value1')
// map.set('key2', 'value2')
// for(let [key, value] of map) {
//   console.log(`key = ${key}, value = ${value}`)
// }

// for(let [key] of map) {
//   console.log(`key = ${key}`)
// }
// for(let [,value] of map) {
//   console.log(`value = ${value}`)
// }
// for(let pair of map) {
//   console.log(pair)
// }

import { mapGetters, mapMutations, mapActions } from 'vuex'