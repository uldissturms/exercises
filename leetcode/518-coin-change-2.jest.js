// [https://leetcode.com/problems/coin-change-2]
// [https://codility.com/media/train/15-DynamicProgramming.pdf]

test('solve - recursively - partial solution', () => {
  expect(solveR([1, 2, 5], 5)).toEqual(4)
  expect(solveR([1, 2, 5], 6)).toEqual(5)
  expect(solveR([1, 3, 4], 5)).toEqual(3)
  expect(solveR([2], 3)).toEqual(0)
  expect(solveI([3], 2)).toEqual(0)
  expect(solveR([10], 10)).toEqual(1)

  /*
  // medium input
  expect(solve([1, 2, 5], 500)).toEqual(12701)
  */
})

test('solve - iteratively', () => {
  expect(solveI([1, 2, 5], 5)).toEqual(4)
  expect(solveI([1, 2, 5], 6)).toEqual(5)
  expect(solveI([2], 3)).toEqual(0)
  expect(solveI([3], 2)).toEqual(0)
  expect(solveI([10], 10)).toEqual(1)

  expect(solveI([1, 2, 5], 500)).toEqual(12701)
})

/*

manually:

0 1 2 3 4 5 6
0 0 0 0 0 0 0
1 1 1 1 1 1 1
2 1 2 2 3 3 4
5 1 2 2 3 4 5

*/

const solveR = (cs, x) => {
  const s = new Set()

  const dp = (x, p) => {

    if (x === 0) {
      s.add(p)
      return
    }

    for (const c of cs) {
      if (c <= x) {
        dp(x - c, p + 1)
      }
    }
  }

  dp(x, 0)

  return s.size
}

const solveI = (cs, x) => {
  const dp = new Array(x + 1).fill(0)
  dp[0] = 1

  for (const c of cs) {
    for (let i = c; i <= x; i++) {
      dp[i] = dp[i] + dp[i - c]
    }
  }

  return dp[x]
}
