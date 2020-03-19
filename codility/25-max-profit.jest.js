test('solve', () => {
  expect(solve([])).toEqual(0)
  expect(solve([1])).toEqual(0)
  expect(solve([1, 2])).toEqual(1)
  expect(solve([1, 2, 3])).toEqual(2)
  expect(solve([1, 3, 2])).toEqual(2)
  expect(solve([3, 1, 2])).toEqual(1)
  expect(solve([3, 2, 1])).toEqual(0)
  // value in between
  expect(solve([5, 2, 3, 4, 1])).toEqual(2)
  // example
  expect(solve([
  23171,
  21011,
  21123,
  21366,
  21013,
  21367,
  ])).toBe(356)
})

const solve = (xs) => {
  let min = xs[0]
  let profit = 0

  for (const x of xs) {
    min = Math.min(x, min)
    const diff = x - min
    if (diff > profit) {
      profit = diff
    }
  }

  return profit
}
