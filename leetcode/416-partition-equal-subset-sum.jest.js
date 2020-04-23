// [https://leetcode.com/problems/partition-equal-subset-sum]

test('solve', () => {
  expect(solve([])).toEqual(false)
  expect(solve([1])).toEqual(false)
  expect(solve([1, 2])).toEqual(false)

  expect(solve([1, 1])).toEqual(true)
  expect(solve([2, 2])).toEqual(true)

  // unique numbers
  expect(solve(new Array(100).fill(0).map((_, i) => i))).toEqual(true)

  // examples
  expect(solve([1, 5, 11, 5])).toEqual(true)
  expect(solve([1, 2, 3, 5])).toEqual(false)
  expect(solve([...new Array(50).fill(1), 100])).toEqual(false)

  // medium
  expect(solve(new Array(24).fill(100))).toEqual(true)

  // large
  expect(solve(new Array(100).fill(100))).toEqual(true)

  // xlarge
  expect(solve(new Array(1000).fill(100))).toEqual(true)
})

const sum = (x, y) => x + y

const keyFor = (xs) => xs.join(`_`)

const solveDP = (xs) => {
  const len = xs.length

  if (len === 0) {
    return false
  }

  const s = xs.reduce(sum, 0)

  if (s % 2 !== 0) {
    return false
  }

  const h = s / 2


  const m = new Map()

  const dp = (i, t) => {
    const k = keyFor([i, t])

    if (t === h) {
      return true
    }

    if (i === len) {
      return false
    }

    if (t > h) {
      return false
    }

    if (m.has(k)) {
      return m.get(k)
    }

    const x = xs[i]
    const res = dp(i + 1, t + x) || dp(i + 1, t)

    m.set(k, res)

    return res
  }

  return dp(0, 0)
};

const solve = solveDP
