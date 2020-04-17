// [https://leetcode.com/problems/regular-expression-matching]

test('solve', () => {
  expect(solve('', '')).toEqual(true)
  expect(solve('', 'a')).toEqual(false)
  expect(solve('a', '')).toEqual(false)

  expect(solve('a', 'a')).toEqual(true)
  expect(solve('aa', 'a')).toEqual(false)
  expect(solve('abc', 'a.c')).toEqual(true)
  expect(solve('abbb', 'ab*')).toEqual(true)
  expect(solve('acd', 'ab*c.')).toEqual(true)
  expect(solve('', 'a*')).toEqual(true)

  expect(solve('ab', '.*c')).toEqual(false)
})

const solve = (xs, pattern) => {
  const parse = (xs) => {
    const res = []
    for (let i = 0; i < xs.length; i++) {

      const x = xs[i]
      const y = xs[i + 1]

      if (y === '*') {
        res.push(`${x}${y}`)
        i++
      } else {
        res.push(x)
      }
    }

    return res
  }

  const ps = parse(pattern)

  const matches = (x, [c]) => c === '.' || x === c

  const isStar = ([_, s]) => s === '*'

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
    const s = isStar(p)

    const r = matches(x, p)
      ? (s ? dfs(xI + 1, pI + 1) || dfs(xI + 1, pI) || dfs(xI, pI + 1) : dfs(xI + 1, pI + 1)) // match
      : (s && dfs(xI, pI + 1)) // not match

    memo.set(k, r)

    return r

  }

  return dfs(0, 0)
}

/*

* split the pattern string into a collection of patterns

aa -> ['a', 'a']
a. -> ['a', '.']
ab* -> ['a', 'b*']
a.* -> ['a', '.*']

matchesPattern(p, c)

* start at string index 0
  * isMatches:
    * advance the string and pattern if character pattern // aa a
    * advance the string and advance pattern
    * not advance the string and advance pattern // cab a*b - aa .*a
  * doesNotMatch:
    * return false // aa ab

*/
