const { test, expect } = require('@jest/globals')
const { currying, curryingInfinite, curriedAdder } = require('./currying')

test('test currying', () => {
  function abc(a, b, c) {
    return [a, b, c]
  }
  const curried = currying(abc)
  expect(curried(1)(2)(3)).toEqual([1, 2, 3])
  expect(curried(1, 2)(3)).toEqual([1, 2, 3])
  expect(curried(1, 2, 3)).toEqual([1, 2, 3])
})

test('test curryingInfinite', () => {
  function adder(...nums) {
    let res = 0
    nums.forEach((num) => (res += num))
    return res
  }
  const curried = curryingInfinite(adder)
  expect(curried(1, 2, 3)(4)(5)(6, 7)()).toBe(28)
  expect(curried(1, 2, 3, 4, 5, 6, 7)()).toBe(28)
})

test('test curriedAdder', () => {
  expect(curriedAdder()(1, 2, 3)(4)(5)(6, 7)()).toBe(28)
  expect(curriedAdder()(1, 2, 3, 4, 5, 6, 7)()).toBe(28)
})
