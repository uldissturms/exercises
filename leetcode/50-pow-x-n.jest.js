test('solve', () => {
  expect(solve(0, 0)).toEqual(0)
  expect(solve(0, 1)).toEqual(0)
  expect(solve(0, 2)).toEqual(0)

  expect(solve(1, 0)).toEqual(1)
  expect(solve(1, 5)).toEqual(1)

  expect(solve(2, 2)).toEqual(4)
  expect(solve(3, 2)).toEqual(9)
  expect(solve(2, 3)).toEqual(8)
  expect(solve(2, 8)).toEqual(256)
  expect(solve(2, -2)).toEqual(0.25)
})

const solve = (x, n) => {
  if (x === 0) return 0
  if (n === 0) return 1

  const pow = Math.abs(n)

  const result =
    n % 2 === 0 ? solve(x * x, pow / 2) : solve(x * x, (pow - 1) / 2) * x

  return n > 0 ? result : 1 / result
}
