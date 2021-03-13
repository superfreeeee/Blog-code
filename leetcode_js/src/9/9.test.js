const { expect, test } = require('@jest/globals')
const { isPalindrome } = require('./9')

test('test 1', () => {
  expect(isPalindrome(121)).toBe(true)
})

test('test 2', () => {
  expect(isPalindrome(-121)).toBe(false)
})

test('test 3', () => {
  expect(isPalindrome(10)).toBe(false)
})

test('test 4', () => {
  expect(isPalindrome(-101)).toBe(false)
})
