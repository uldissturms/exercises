// [https://leetcode.com/problems/coin-change-2]

test('solve - recursively', () => {
  expect(solveR([1, 2, 5], 5)).toEqual(4)
  expect(solveR([1, 3, 4], 5)).toEqual(3)
  expect(solveR([2], 3)).toEqual(0)
  expect(solveR([2], 3)).toEqual(0)
  expect(solveR([10], 10)).toEqual(1)

  /*
  // medium input
  expect(solve([1, 2, 5], 500)).toEqual(12701)
  */
})

test('solve - iteratively', () => {
  expect(solveI([1, 2, 5], 5)).toEqual(4)
  expect(solveI([2], 3)).toEqual(0)
  expect(solveI([2], 3)).toEqual(0)
  expect(solveI([10], 10)).toEqual(1)

  /*
  // medium input
  expect(solveI([1, 2, 5], 100)).toEqual(12701)
  */
})

/*

0 1 2 3 4 5 6
0 0 0 0 0 0 0
1 1 1 1 1 1 1
2 1 2 2 3 3 4 // 6 * 1s, 3 * 2s, 2 * 2s + 2 * 1s, 1 * 2s + 4 * 1s
5 1 2 2 3 4


0: Set()
1: Set(1)
2: Set(2, 1)
3: Set(3, 2)
4: Set(4, 3, 2)
5: Set(5)

c: 2

*/

const debug = true

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

const combinationsOf = (c, ps, s) => {
  if (!ps) {
    return
  }

  for (const p of [...ps]) {
    s.add(p + 1)
  }

  return s
}

const solveI = (cs, x) => {
  const dp = new Array(x + 1).fill(undefined).map(x => new Set())
  dp[0] = new Set([0])

  for (const c of cs) {
    for (let i = c; i <= x; i++) {
      dp[i] = combinationsOf(c, dp[i - c], dp[i])
    }
  }

  return dp[x].size
}
