const { test, expect } = require('@jest/globals')
const { lengthOfLongestSubstring } = require('./3')

test('test 1', () => {
  expect(lengthOfLongestSubstring('abcabcbb')).toBe(3)
})

test('test 2', () => {
  expect(lengthOfLongestSubstring('bbbbb')).toBe(1)
})

test('test 3', () => {
  expect(lengthOfLongestSubstring('pwwkew')).toBe(3)
})

test('test 4', () => {
  expect(lengthOfLongestSubstring('')).toBe(0)
})