const { expect, test } = require('@jest/globals')
const { isMatch } = require('./10')

test('test 1', () => {
  expect(isMatch('aa', 'a')).toBe(false)
})

test('test 2', () => {
  expect(isMatch('aa', 'a*')).toBe(true)
})

test('test 3', () => {
  expect(isMatch('ab', '.*')).toBe(true)
})

test('test 4', () => {
  expect(isMatch('aab', 'c*a*b')).toBe(true)
})

test('test 5', () => {
  expect(isMatch('mississippi', 'mis*is*p*.')).toBe(false)
})
