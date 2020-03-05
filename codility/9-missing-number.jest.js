const max = 100000

test('solve', () => {
  expect(solve([1, 2, 0])).toEqual(3)
  expect(solve([7, 8, 9, 11, 12])).toEqual(1)
  expect(solve([3, 4, -1, 1])).toEqual(2)
  expect(solve([5, 4, 3, 2, 1])).toEqual(6)
  expect(solve([1, 2, 3, 4, 5])).toEqual(6)
  expect(solve([2, 1, 0, 5, 4])).toEqual(3)
})

test('solve - extremes', () => {
  expect(solve([0])).toEqual(1)
  expect(solve([-1])).toEqual(1)
  expect(solve([max])).toEqual(1)
})

const solve = (xs) => {
  const filters = xs.filter(x => x > 0)
  const nums = new Set(filters)
  for (let i = 1; i <= filters.length + 1; i++) {
    if (!nums.has(i)) {
      return i
    }
  }
  return undefined
}
