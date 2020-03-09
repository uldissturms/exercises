test('solve', () => {
  // no dominator
  expect(solve([])).toEqual(-1)
  expect(solve([1, 2])).toEqual(-1)
  expect(solve([1, 2, 3])).toEqual(-1)

  // dominator
  expect(solve([1])).toEqual(0)
  expect(solve([1, 1, 2])).toEqual(1)
  expect(solve([1, 1, 2, 2, 1])).toEqual(4)

  expect(solve([3, 4, 3, 2, 3, -1, 3, 3])).toEqual(7)
})

const solve = (xs) => {
  const halfLength = Math.floor(xs.length / 2)
  const m = new Map()

  for (let i = 0; i < xs.length; i++) {
    const x = xs[i]
    const count = (m.has(x) ? m.get(x) : 0) + 1
    if (count > halfLength) {
      return i
    }
    m.set(x, count)
  }

  return -1
}
