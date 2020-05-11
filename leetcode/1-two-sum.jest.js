// [https://leetcode.com/problems/two-sum]

test('solve', () => {
  expect(solve([2, 7, 11, 15], 9)).toEqual([0, 1])
})

const solve = (xs, t) => {
  const m = new Map()

  for (let i = 0; i < xs.length; i++) {
    const x = xs[i]
    const j = m.get(t - x) // x + y = t -> y = t - x
    if (j != null) {
      return [j, i]
    }
    m.set(x, i)
  }

  return []
}
