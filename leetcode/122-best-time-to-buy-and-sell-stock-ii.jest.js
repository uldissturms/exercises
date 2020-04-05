// [https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii]

test('solve', () => {
  // simple
  expect(solve([])).toEqual(0)
  expect(solve([1])).toEqual(0)
  expect(solve([1, 1])).toEqual(0)
  expect(solve([1, 2])).toEqual(1)
  expect(solve([2, 1])).toEqual(0)
  expect(solve([1, 2, 3])).toEqual(2)
  expect(solve([1, 2, 1, 2])).toEqual(2)

  // one inbetween
  expect(solve([2, 1, 5, 2])).toEqual(4)

  expect(solve([7, 1, 5, 3, 6, 4])).toEqual(7)
  expect(solve([1, 2, 3, 4, 5])).toEqual(4)
  expect(solve([7, 6, 4, 3, 1])).toEqual(0)
  expect(solve([1, 10, 2, 20])).toEqual(27)
})

const solve = xs => {
  const len = xs.length

  if (len < 2) {
    return 0
  }

  let profit = 0

  for (let i = 0; i < len - 1; i++) {
    const c = xs[i]
    const n = xs[i + 1]

    if (c < n) {
      profit += n - c
    }
  }

  return profit
}
