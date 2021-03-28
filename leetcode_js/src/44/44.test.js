const { expect, test } = require('@jest/globals')
const { isMatch } = require('./44')

test('test 1', () => {
  expect(isMatch('aa', 'a')).toBe(false)
})

test('test 2', () => {
  expect(isMatch('aa', '*')).toBe(true)
})

test('test 3', () => {
  expect(isMatch('cb', '?a')).toBe(false)
})

test('test 4', () => {
  expect(isMatch('adceb', '*a*b')).toBe(true)
})

test('test 5', () => {
  expect(isMatch('acdcb', 'a*c?b')).toBe(false)
})

test('test 6', () => {
  expect(isMatch('', '*****')).toBe(true)
})
