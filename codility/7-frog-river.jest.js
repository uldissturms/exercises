/*
steps:
1. init a new set
2. for each array item
  add position to set
  if set size = X return time index
3. return -1
*/

/*
edge cases:
1. cannot jump across lake
2, N and X = 1
*/

test('solve', () => {
  expect(solve(5, [1, 3, 1, 4, 2, 3, 5, 4])).toBe(6)
  expect(solve(1, [1])).toBe(0)
  expect(solve(2, [1])).toBe(-1)
})

const solve = (x, as) => {
  const s = new Set()
  for (let i = 0; i < as.length; i++) {
    const p = as[i]
    s.add(p)
    if (s.size === x) {
      return i
    }
  }
  return -1
}
