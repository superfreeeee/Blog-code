const { expect, test } = require('@jest/globals')
const { lengthOfLIS } = require('./300')

test('test 1', () => {
  expect(lengthOfLIS([10, 9, 2, 5, 3, 7, 101, 18])).toBe(4)
})

test('test 2', () => {
  expect(lengthOfLIS([0, 1, 0, 3, 2, 3])).toBe(4)
})

test('test 3', () => {
  expect(lengthOfLIS([7, 7, 7, 7, 7, 7, 7])).toBe(1)
})

test('test 4', () => {
  expect(lengthOfLIS([1, 3, 6, 7, 9, 4, 10, 5, 6])).toBe(6)
})
