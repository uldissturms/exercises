test('solve', () => {
  expect(solve(10, 85, 30)).toBe(3)
  expect(solve(10, 10, 30)).toBe(0)
})

const solve = (x, y, d) => Math.ceil((y - x) / d)
