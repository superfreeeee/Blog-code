// function* gen() {
//   yield 'first next'
//   yield 'second next'
//   yield 'third next'
//   return 'end'
// }

// const g = gen()
// console.log(g.next())
// console.log(g.next())
// console.log(g.next())
// console.log(g.next())
// console.log(g.next())

// const g = gen()
// let res
// while(!(res = g.next()).done) {
//   console.log(res.value)
// }

// for(let value of gen()) {
//   console.log(value)
// }

// function* gen() {
//   let val = 0
//   while(true) {
//     let next = yield val
//     if(next) {
//       val = next
//     }
//   }
// }

// const g = gen()
// console.log(g.next())
// console.log(g.next(1))
// console.log(g.next())
// console.log(g.next(3))

// function* objectEntrys() {
//   let keys = Object.keys(this)
//   for(let key of keys) {
//     yield [key, obj[key]]
//   }
// }
// const obj = { id: 0, name: 'John', age: 18 }
// obj[Symbol.iterator] = objectEntrys
// for(let [key, value] of obj) {
//   console.log(`${key}:${value}`)
// }

// function* range(...params) {
//   if(params.length == 0) {
//     return
//   }
//   if(params.length == 1) {
//     params.unshift(0)
//   }
//   if(params.length == 2) {
//     params.push(1)
//   }
//   let [start, end, step] = params
//   while(start < end) {
//     yield start
//     start += step
//   }
// }
// console.log([...range(10)])
// console.log([...range(2, 10)])
// console.log([...range(2, 10, 2)])

// let obj = {
//   gen: function* () {}
// }

// let obj = {
//   * gen() {}
// }

// let nums = {
//   *[Symbol.iterator]() {
//     yield 1
//     yield 2
//     yield 3
//   }
// }
// for(let num of nums) {
//   console.log(num)
// }

// function* foo() {
//   yield val
//   yield val + 1
// }

// function* bar() {
//   this.val = 10
//   yield* foo()
//   console.log(this.val)
// }

// let b = bar()
// console.log(b.next())
// console.log(b.next())
// console.log(b.next())
// console.log(this.val)

// function* gen() {
//   yield console.log('gen 1')
//   yield console.log('gen 2')
//   yield console.log('gen 3')
// }
// gen.prototype.hi = () => console.log('hello')
// let g = gen()
// g.next()
// g.next()
// g.hi()

// function* Gen() {
//   console.log(this)
// }
// Gen().next()
// let g = Gen()
// console.log(g.a)

// let g2 = new Gen()

// function* gen() {
//   yield this.id = 0
//   yield this.name = 'John'
//   yield this.age = 18
// }
// let obj = {}
// let g = gen.call(obj)
// console.log(g.next())
// console.log(g.next())
// console.log(g.next())
// console.log(obj)

// function* gen() {
//   yield this.id = 0
//   yield this.name = 'John'
//   yield this.age = 18
// }

// function Gen() {
//   return gen.call(gen.prototype)
// }

// let g = new Gen()
// console.log(g.next())
// console.log(g.next())
// console.log(g.next())
// console.log(g.id)
// console.log(g.name)
// console.log(g.age)

// function* gen() {
//   yield 1
//   yield 2
//   yield 3
// }

// let g = gen()
// console.log(g.next())
// try {
//   console.log(g.throw())
// } catch(e) {
//   console.log('catch')
// }
// console.log(g.next())

// function* gen() {
//   yield 1
//   yield 2
//   yield 3
//   yield 4
// }
// let g = gen()
// console.log(g.next())
// console.log(g.next())
// console.log(g.return(-1))
// console.log(g.next())

// function* gen() {
//   try {
//     yield 'try 1'
//     yield 'try 2'
//   } finally {
//     yield 'finally 1'
//     yield 'finally 2'
//   }
//   yield 'after try-finally'
// }

// let g = gen()
// console.log(g.next())
// console.log(g.return(-1))
// console.log(g.next())
// console.log(g.next())

// function* asyncRequest(url) {
//   let res = yield request(url)
//   if(res && res.status) {
//     return {
//       status: 'success',
//       data: res.data
//     }
//   } else {
//     return {
//       status: 'error',
//       data: res.data
//     }
//   }
// }

// let requestLoader = asyncRequest('http://localhost:8080/hello')
// let res = requestLoader.next()

function* objectIterator() {
  let keys = Object.keys(this)
  for (let key of keys) {
    yield [key, obj[key]]
  }
}

let obj = { id: 0, name: 'John', age: 18 }
obj[Symbol.iterator] = objectIterator

for(let [key, value] of obj) {
  console.log(`{ ${key}: ${value} }`)
}
