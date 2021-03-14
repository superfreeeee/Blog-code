const { expect, test } = require('@jest/globals')
const { generateParenthesis, generateParenthesis2 } = require('./22')

expect.extend({
  toMatchSet(actual, expected) {
    if (actual.length !== expected.length) {
      return {
        pass: false,
        message: () =>
          `expected length: ${expected.length}, actual length: ${actual.length}`,
      }
    }
    actual.sort()
    expected.sort()
    const n = actual.length
    for (let i = 0; i < n; i++) {
      if (actual[i] !== expected[i]) {
        return {
          pass: false,
          message: () => `values not match`,
        }
      }
    }
    return {
      pass: true,
      message: () => '',
    }
  },
})

test('test 1', () => {
  expect(generateParenthesis(3)).toMatchSet([
    '((()))',
    '(()())',
    '(())()',
    '()(())',
    '()()()',
  ])
})

test('test 2', () => {
  expect(generateParenthesis(1)).toMatchSet(['()'])
})

test('test 3', () => {
  expect(generateParenthesis2(3)).toMatchSet([
    '((()))',
    '(()())',
    '(())()',
    '()(())',
    '()()()',
  ])
})

test('test 4', () => {
  expect(generateParenthesis2(1)).toMatchSet(['()'])
})
