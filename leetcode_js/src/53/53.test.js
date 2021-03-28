const { expect, test } = require('@jest/globals')
const { maxSubArray } = require('./53')

test('test 1', () => {
  expect(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4])).toBe(6)
})

test('test 2', () => {
  expect(maxSubArray([1])).toBe(1)
})

test('test 3', () => {
  expect(maxSubArray([0])).toBe(0)
})

test('test 4', () => {
  expect(maxSubArray([-1])).toBe(-1)
})

test('test 5', () => {
  expect(maxSubArray([-100000])).toBe(-100000)
})
