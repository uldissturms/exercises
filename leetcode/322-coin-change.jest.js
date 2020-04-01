// [https://leetcode.com/problems/coin-change]

test('solve', () => {
  expect(solve([1, 2, 5], 11)).toEqual(3)
  expect(solve([1, 3, 4], 6)).toEqual(2)
  expect(solve([2], 3)).toEqual(-1)
})

/*
    0   1     2    3    4    5    6
0   0, Inf, Inf, Inf, Inf, Inf, Inf
1   0,  1,   2,   3,   4,   5,   6
3   0,  1,   2,   1,   2,   3,   2
4   0,  1,   2,   1,   1,   2,   2
*/
const solve = (cs, x) => {
  const dp = new Array(x + 1).fill(Infinity)
  dp[0] = 0

  for (const c of cs) {
    for (i = c; i <= x; i++) {
      dp[i] = Math.min(dp[i], dp[i - c] + 1) // 3
    }
  }

  return dp[x] === Infinity ? -1 : dp[x]
}
