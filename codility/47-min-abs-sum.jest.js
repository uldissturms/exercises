// [https://codility.com/media/train/solution-min-abs-sum.pdf]
// https://app.codility.com/demo/results/trainingMMQUEP-H92]

test('solve - optimal', () => {
  expect(solve([])).toEqual(0)
  expect(solve([1])).toEqual(1)
  expect(solve([1, 2])).toEqual(1)
  expect(solve([1, 2, 3])).toEqual(0)
  expect(solve([1, 5, 2, -2])).toEqual(0)
  expect(solve([3, 3, 3, 4, 5])).toEqual(0)
})

test('solve - brute force', () => {
  expect(solveBF([])).toEqual(0)
  expect(solveBF([1])).toEqual(1)
  expect(solveBF([1, 2])).toEqual(1)
  expect(solveBF([1, 2, 3])).toEqual(0)
  expect(solveBF([1, 5, 2, -2])).toEqual(0)
  expect(solveBF([3, 3, 3, 4, 5])).toEqual(0)
})

const solveBF = xs => {
  const len = xs.length

  const dfs = (i) => {
    if (i < 0) {
      return [0]
    }

    const res = dfs(i - 1).flatMap(x => [x + xs[i], x - xs[i]])
    return res
  }

  return Math.min(...dfs(len - 1).map(x => Math.abs(x)))
}

const solve = ns => {
  const xs = ns.map(x => Math.abs(x))
  const len = xs.length
  const max = Math.max(...xs, 0)
  const sum = xs.reduce((x, y) => x + y, 0)

  const cs = new Array(max + 1).fill(0)
  for (const x of xs) {
    cs[x] = cs[x] + 1
  }

  const dp = new Array(sum + 1).fill(-1)
  dp[0] = 0
  for  (let i = 1; i <= max; i++) {
    if (cs[i] > 0) {
      for (let j = 0; j < sum; j++) {
        if (dp[j] >= 0) {
          dp[j] = cs[i]
        } else if (j >= i && dp[j - i] > 0) {
          dp[j] = dp[j - i] - 1
        }
      }
    }
  }

  let res = sum
  for (let i = 0; i < Math.floor(sum / 2) + 1; i++) {
    if (dp[i] >= 0) {
      res = Math.min(res, sum - 2 * i)
    }
  }

  return res
}
