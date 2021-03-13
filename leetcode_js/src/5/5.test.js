const { test, expect } = require('@jest/globals')
const { longestPalindrome } = require('./5')

test('test 1', () => {
  expect(longestPalindrome('babad')).toBe('bab')
})
test('test 2', () => {
  expect(longestPalindrome('cbbd')).toBe('bb')
})
test('test 3', () => {
  expect(longestPalindrome('a')).toBe('a')
})
test('test 4', () => {
  expect(longestPalindrome('ac')).toBe('a')
})
