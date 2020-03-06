test('solve', () => {
  expect(solve([2, 1, 1, 2, 3, 1])).toBe(3)
})

const solve = (xs) => new Set(xs).size
