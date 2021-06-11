import sum from './index'

type BinaryFn = (a: number, b: number) => number

test('test babel', () => {
  const fn: BinaryFn = sum
  expect(fn(2, 2)).toBe(4)
})
