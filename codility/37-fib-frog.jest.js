// [https://app.codility.com/demo/results/trainingUJZ7SB-M58]

test('solve', () => {
  // single jump first fib nums (1, 2, 3)
  expect(solve([0])).toEqual(1)
  expect(solve([1])).toEqual(1)
  expect(solve([0, 1])).toEqual(1)

  // two jumps
  expect(solve([0, 1, 0])).toEqual(2)
  //
  expect(solve([0, 1, 0, 0, 0, 0])).toEqual(2)

  // select best
  expect(solve([0, 1, 0, 0])).toEqual(1)

  // cannot jump over
  expect(solve([0, 1, 0, 0, 0])).toEqual(-1)

  // example
  expect(solve([0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0])).toEqual(3)

  // large input
  expect(solve(new Array(1000).fill(0).map((_, i) => i % 2))).toEqual(5)
  expect(solve(new Array(10000).fill(0).map((_, i) => i % 2))).toEqual(5)
  expect(solve(new Array(100000).fill(0).map((_, i) => i % 2))).toEqual(8)
})

// for every position
// attempt all valid jumps
// return min jumps needed

const solveI = xs => {
  const n = xs.length

  if (n <= 2) {
    return 1
  }

  const fs = fibList(n + 1)

  const dp = new Array(n).fill(Infinity)

  dp[n] = 0

  for (let i = n - 1; i >= -1; i--) {
    if (i === -1 || xs[i] === 1) {
      let min = Infinity

      for (const f of fs) {
        const eI = i + f

        if (eI > n) {
          break;
        }

        const prev = dp[eI]
        if (prev < min) {
          min = prev
        }
      }

      dp[i] = min + 1
    }
  }

  const res = dp[-1]

  return res === Infinity ? -1 : res
}

const solveR = xs => {
  const n = xs.length
  const m = new Map()

  if (n <= 2) {
    return 1
  }

  const fs = fibList(n + 1)

  const dp = (i) => {
    if (m.has(i)) {
      return m.get(i)
    }

    if (i === n) {
      return 0
    }

    if (i > n) {
      return Infinity
    }

    if (xs[i] === 0) {
      return Infinity
    }

    const opts = []

    for (const f of fs) {
      const eI = i + f
      opts.push(dp(eI))
    }

    const res = Math.min(...opts, Infinity) + 1

    m.set(i, res)

    return res
  }

  const res = dp(-1)

  return res === Infinity ? -1 : res
}

const solve = solveI

// https://oeis.org/A000045
// 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181, 6765, 10946, 17711, 28657, 46368, 75025, 121393, 196418, 317811, 514229, 832040, 1346269, 2178309, 3524578, 5702887, 9227465, 14930352, 24157817, 39088169, 63245986, 102334155...
const fibList = n => {
  const rs = []

  let twoBack = 0
  let oneBack = 1

  let current = oneBack + twoBack

  while (current <= n) {
    rs.push(current)

    current = oneBack + twoBack

    twoBack = oneBack
    oneBack = current
  }

  return new Set(rs)
}
