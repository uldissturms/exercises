// [https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iv]

test('solve', () => {
  expect(solve([], 1)).toEqual(0)
  expect(solve([1], 1)).toEqual(0)
  expect(solve([1, 1], 1)).toEqual(0)
  expect(solve([1, 2], 1)).toEqual(1)
  expect(solve([1, 2], 2)).toEqual(1)
  expect(solve([1, 2, 3], 2)).toEqual(2)

  expect(solve([1, 3, 1, 3], 2)).toEqual(4)
  expect(solve([1, 2, 3, 2, 1, 3], 2)).toEqual(4)
  expect(solve([1, 2, 3, 2, 1, 7], 1)).toEqual(6)
  expect(solve([1, 2, 3, 2, 1, 7], 2)).toEqual(8)
  expect(solve([5, 6, 1, 2, 3, 2, 1, 7], 3)).toEqual(9)

  expect(solve([2, 4, 1], 2)).toEqual(2)
  expect(solve([3, 2, 6, 5, 0, 3], 2)).toEqual(7)

  // medium
  let size = 100
  const largeK = 1000000000
  expect(solve(new Array(size).fill().map((_, i) => i), largeK)).toEqual(
    size - 1
  )

  // large
  size = 100000
  expect(solve(new Array(size).fill().map((_, i) => i), largeK)).toEqual(
    size - 1
  )
})

const greedy = xs => {
  let profit = 0

  for (let i = 1; i < xs.length; i++) {
    const cur = xs[i]
    const prev = xs[i - 1]

    if (cur > prev) {
      profit += cur - prev
    }
  }

  return profit
}

const solveTD = (xs, k) => {
  const len = xs.length

  // we can buy and sell as many times as we like
  if (k >= len / 2) {
    return greedy(xs)
  }

  const keyFor = xs => xs.join(`_`)

  const m = new Map()

  const dp = (i, k, ts) => {
    if (k === -1) {
      return 0
    }

    if (i === len) {
      return 0
    }

    const key = keyFor([i, k, ts])

    if (m.has(key)) {
      return m.get(key)
    }

    const x = xs[i]

    const res = (() => {
      if (ts == null) {
        // ts not started
        const db = dp(i + 1, k)

        if (k > 0 && i < len - 1) {
          const b = dp(i + 1, k - 1, x, i)
          return Math.max(db, b)
        }

        return db
      } else {
        // ts started
        const ds = dp(i + 1, k, ts)
        const diff = x - ts

        if (diff > 0) {
          const s = dp(i + 1, k) + Math.max(0, x - ts)
          return Math.max(ds, s)
        }

        return ds
      }
    })()

    m.set(key, res)

    return res
  }

  return dp(0, k)
}

const solveBU = (xs, k) => {
  const len = xs.length

  if (k >= len / 2) {
    return greedy(xs)
  }

  const dp = new Array(k + 1).fill().map(() => new Array(len).fill(0))
  for (let i = 1; i <= k; i++) {
    let max = -xs[0]
    for (let j = 1; j < len; j++) {
      dp[i][j] = Math.max(dp[i][j - 1], xs[j] + max)
      max = Math.max(max, dp[i - 1][j - 1] - xs[j])
    }
  }

  return dp[k][len - 1]
}

const solve = solveBU
