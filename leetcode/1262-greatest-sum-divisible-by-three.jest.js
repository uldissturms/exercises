// [https://leetcode.com/problems/greatest-sum-divisible-by-three]

test('solve', () => {
  expect(solve([3, 6, 5, 1, 8])).toEqual(18)
  expect(solve([1, 2, 3, 4, 4])).toEqual(12)
  expect(solve([4])).toEqual(0)
  // edge cases
  expect(solve([0])).toEqual(0)
  expect(solve([])).toEqual(0)
})

const clone = x => JSON.parse(JSON.stringify(x))

const solve = xs => {
  // init sums
  let dp = new Array(3).fill(0)
  // for each number
  for (const x of xs) {
    const cur = clone(dp)
    // for each previous sum - so that we don't double count the number in 2 categories
    for (const sum of dp) {
      const total = sum + x
      const index = total % 3
      cur[index] = Math.max(total, cur[index])
    }
    dp = cur
  }
  return dp[0]
}
