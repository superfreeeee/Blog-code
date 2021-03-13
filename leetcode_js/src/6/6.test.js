const { test, expect } = require('@jest/globals')
const { convert } = require('./6')

test('test 1', () => {
  expect(convert('PAYPALISHIRING', 3)).toBe('PAHNAPLSIIGYIR')
})

test('test 2', () => {
  expect(convert('PAYPALISHIRING', 4)).toBe('PINALSIGYAHRPI')
})

test('test 3', () => {
  expect(convert('A', 1)).toBe('A')
})
