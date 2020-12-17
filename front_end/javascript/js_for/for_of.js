const nums = [ 1, 2, 3, 4, 5 ]

console.log('----- for num of nums -----')
for (let num of nums) {
  console.log(num)
}

const string = 'abcde'
console.log('----- for c of string -----')
for (let c of string) {
  console.log(c)
}

const o = { a: 1, b: 2, c: 3 }
console.log('----- for item of object -----')
try {
  for (let item of o) {
    console.log(item)
  }
} catch (err) {
  console.log(err)
}

const fakeNums = {}
fakeNums[Symbol.iterator] = function* () {
  yield 1
  yield 2
  yield 3
  yield 4
  return
}
console.log('----- for num of fakeNums -----')
for (let num of fakeNums) {
  console.log(num)
}

const object = { a: 1, b: 2, c: 3 }
object[Symbol.iterator] = function* () {
  for (let prop in this) {
    yield { [prop]: this[prop] }
  }
}

console.log('----- for item of object -----')
for (let item of object) {
  console.log(item)
}