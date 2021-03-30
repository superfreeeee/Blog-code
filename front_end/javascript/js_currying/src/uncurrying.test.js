const { test, expect } = require('@jest/globals')
const {
  uncurryingByCall,
  uncurryingByApply,
  uncurryingByReflect,
} = require('./uncurrying')

test('test uncurryingByCall', () => {
  const slice = uncurryingByCall(Array.prototype.slice)
  expect(slice([1, 2, 3, 4, 5], 1, 3)).toEqual([2, 3])
})

test('test uncurryingByApply', () => {
  const slice = uncurryingByApply(Array.prototype.slice)
  expect(slice([1, 2, 3, 4, 5], 1, 3)).toEqual([2, 3])
})

test('test uncurryingByReflect', () => {
  const slice = uncurryingByReflect(Array.prototype.slice)
  expect(slice([1, 2, 3, 4, 5], 1, 3)).toEqual([2, 3])
})
