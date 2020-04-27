// [https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iii]

test('solve', () => {
  expect(solve([])).toEqual(0)
  expect(solve([1])).toEqual(0)
  expect(solve([1, 1])).toEqual(0)
  expect(solve([1, 2])).toEqual(1)
  expect(solve([1, 2, 3])).toEqual(2)
  expect(solve([1, 3, 1, 3])).toEqual(4)

  expect(solve([3,3,5,0,0,3,1,4])).toEqual(6)
  expect(solve([1,2,3,4,5])).toEqual(4)
  expect(solve([5, 4, 3, 2, 1])).toEqual(0)

  // examples
  // two transactions at start next to each other
  expect(solve([1, 5, 1, 7])).toEqual(10)

  // two transactions at start one apart
  expect(solve([1, 5, 3, 1, 7])).toEqual(10)

  // two transactions at end
  expect(solve([1, 3, 1, 5, 1, 7])).toEqual(10)

  // two transactions at end one apart
  expect(solve([1, 3, 1, 5, 3, 1, 7])).toEqual(10)
})

const solve = xs => {
  const len = xs.length

  const ltr = new Array(len).fill(0)

  let profit = 0
  let min = Infinity

  for (let i = 0; i < len; i++) {
    const x = xs[i]
    min = Math.min(min, x)
    const v = x - min
    profit = Math.max(profit, v)
    ltr[i] = profit
  }

  let max = 0
  for (let i = len - 1; i > 0; i--) {
    const x = xs[i]
    max = Math.max(max, x)
    const l = ltr[i - 1]
    profit = Math.max(profit, l + max - x)
  }

  return profit
}
