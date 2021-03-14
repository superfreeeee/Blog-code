const { expect, test } = require('@jest/globals')
const { longestCommonPrefix } = require('./14')

test('test 1', () => {
  expect(longestCommonPrefix(['flower', 'flow', 'flight'])).toBe('fl')
})

test('test 2', () => {
  expect(longestCommonPrefix(['dog', 'racecar', 'car'])).toBe('')
})
