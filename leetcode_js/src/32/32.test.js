const { expect, test } = require('@jest/globals')
const { longestValidParentheses } = require('./32')

test('test 1', () => {
  expect(longestValidParentheses('(()')).toBe(2)
})

test('test 2', () => {
  expect(longestValidParentheses(')()())')).toBe(4)
})

test('test 3', () => {
  expect(longestValidParentheses('')).toBe(0)
})

test('test 3', () => {
  expect(longestValidParentheses('()(()')).toBe(2)
})
