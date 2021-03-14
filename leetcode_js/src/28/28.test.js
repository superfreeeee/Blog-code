const { expect, test } = require('@jest/globals')
const { strStr } = require('./28')

test('test 1', () => {
  expect(strStr('hello', 'll')).toBe(2)
})

test('test 2', () => {
  expect(strStr('aaaaa', 'bba')).toBe(-1)
})
