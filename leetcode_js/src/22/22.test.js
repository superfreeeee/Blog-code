require('../utils/expect')
const { expect, test } = require('@jest/globals')
const { generateParenthesis, generateParenthesis2 } = require('./22')

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
