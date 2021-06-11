test('toBe', () => {
  expect(1 + 1).toBe(2)
  // expect('1').toBe(1)
  // expect({ a: 1 }).toBe({ a: 1 })
})

test('toEqual', () => {
  expect({ a: 1 }).toEqual({ a: 1 })
  expect([1, 2, 3]).toEqual([1, 2, 3])
})

test('not', () => {
  expect(1).not.toBe(0)
})
