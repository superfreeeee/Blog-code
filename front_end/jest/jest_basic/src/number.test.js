test('2 + 2', () => {
  const val = 2 + 2
  expect(val).toBe(4)
  expect(val).toEqual(4)

  expect(val).toBeGreaterThan(3)
  expect(val).toBeGreaterThanOrEqual(3.5)
  expect(val).toBeLessThan(5)
  expect(val).toBeLessThanOrEqual(4.5)
})

test('0.1 + 0.2', () => {
  const val = 0.1 + 0.2
  expect(val).not.toBe(0.3)
  expect(val).toBeCloseTo(0.3)
})
