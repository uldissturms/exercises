// [https://leetcode.com/problems/partition-equal-subset-sum]

test('solve', () => {
  expect(solve([])).toEqual(false)
  expect(solve([1])).toEqual(false)
  expect(solve([1, 2])).toEqual(false)

  expect(solve([1, 1])).toEqual(true)
  expect(solve([2, 2])).toEqual(true)

  // examples
  expect(solve([1, 5, 11, 5])).toEqual(true)
  expect(solve([1, 2, 3, 5])).toEqual(false)
  expect(solve([...new Array(50).fill(1), 100])).toEqual(false)

  //
  // medium
  expect(solve(new Array(24).fill(100))).toEqual(true)

  // large
  expect(solve(new Array(100).fill(100))).toEqual(true)

  // xlarge
  expect(solve(new Array(1000).fill(100))).toEqual(true)
})

const sum = (x, y) => x + y

const solveBT = (xs) => {
  const s = xs.reduce(sum, 0)

  if (s === 0) {
    return false
  }

  if (s % 2 === 1) {
    return false
  }

  const h = s / 2
  xs.sort((x, y) => x - y)

  const bt = (t, i) => {
    if (i > xs.length) {
      return false
    }

    if (t > h) {
      return false
    }

    if (t === h) {
      return true
    }

    return bt(t + xs[i], i + 1) || bt(t, i + 1)
  }

  return bt(0, 0)
}

const solveSet = xs => {
  const s = xs.reduce(sum, 0)

  if (s === 0) {
    return false
  }

  if (s % 2 === 1) {
    return false
  }

  const h = s / 2
  const rs = new Set()

  for (const x of xs) {
    const temp = new Set(rs)
    for (const r of temp) {
      const v = r + x
      if (v === h) {
        return true
      }

      if (v < h) {
        rs.add(v)
      }
    }
    rs.add(x)
  }

  return rs.has(h)
}

const solveBF = xs => {
  const s = xs.reduce(sum, 0)

  if (s === 0) {
    return false
  }

  if (s % 2 === 1) {
    return false
  }

  const h = s / 2
  const isH = x => x === h

  const m = new Map()

  const dfs = (i) => {

    if (m.has(i)) {
      return m.get(i)
    }

    if (i === -1) {
      return [0]
    }

    const x = xs[i]

    const opts = [
      ...dfs(i - 1), // don't add
      ...dfs(i - 1).map(y => y + x) // add
    ]

    if (opts.some(isH)) {
      return [h]
    }

    m.set(i, opts)

    return opts
  }

  return dfs(xs.length - 1).some(isH)
}

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

  const keyFor = (xs) => xs.join(`_`)

  const m = new Map()

  const dp = (i, left) => {
    const k = keyFor([i, left])

    if (left === 0) {
      return true
    }

    if (i === len) {
      return false
    }

    if (m.has(k)) {
      return m.get(k)
    }

    if (xs[i] <= left) {
      if (dp(i + 1, left - xs[i])) {
        m.set(k, true)
        return true
      }
    }

    const res = dp(i + 1, left)

    m.set(k, res)

    return res
  }

  return dp(0, h)
};

const solve = solveDP
