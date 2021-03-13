const { expect, test } = require('@jest/globals')
const { myAtoi } = require('./8')

test('test 1', () => {
  expect(myAtoi('42')).toBe(42)
})

test('test 2', () => {
  expect(myAtoi('   -42')).toBe(-42)
})

test('test 3', () => {
  expect(myAtoi('4193 with words')).toBe(4193)
})

test('test 4', () => {
  expect(myAtoi('words and 987')).toBe(0)
})

test('test 5', () => {
  expect(myAtoi('-91283472332')).toBe(-2147483648)
})
