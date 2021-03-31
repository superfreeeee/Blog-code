const { test, expect } = require('@jest/globals')
const { f1, f2 } = require('./simple')

test('test f1', () => {
  expect(f1(1, 2, 3)).toEqual([1, 2, 3])
})

test('test f2', () => {
  expect(f2(1)(2)(3)).toEqual([1, 2, 3])
})
