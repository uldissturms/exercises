// [https://leetcode.com/problems/wildcard-matching]

test('solve', () => {
  expect(solve('', '')).toEqual(true)
  expect(solve('', 'a')).toEqual(false)
  expect(solve('a', '')).toEqual(false)

  expect(solve('aa', '*')).toEqual(true)
  expect(solve('cb', '?a')).toEqual(false)
  expect(solve('adceb', '*a*b')).toEqual(true)
  expect(solve('adceb', 'a*c?b')).toEqual(true)
  expect(solve('acdcb', 'a*c?b')).toEqual(false)
})


const solve = (xs, ps) => {

  const matches = (x, p) => p === '?' || p === '*' || x === p

  const memo = new Map()
  const keyFor = (xs) => xs.join('_')

  const dfs = (xI, pI) => {
    const k = keyFor([xI, pI])

    if (memo.has(k)) {
      return memo.get(k)
    }

    if (pI === ps.length) {
      return xI === xs.length
    }

    if (xI > xs.length) {
      return false
    }

    const x = xs[xI]
    const p = ps[pI]
    const s = p === '*'

    const r = matches(x, p)
      && (s
        ? dfs(xI + 1, pI + 1) || dfs(xI + 1, pI) || dfs(xI, pI + 1)
        : dfs(xI + 1, pI + 1)
      )

    memo.set(k, r)

    return r

  }

  return dfs(0, 0)
}
