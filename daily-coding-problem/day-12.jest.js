const assert = require('assert')

/*

manually:
=========

xs: abcba
k: 2

solve:
===========

1. if past last index - return last inputs as answer
2. otherwise for each index
  include existing [start, end] ranges
  solve for start new
  if set size < k solve for continue
  return the best of two solutions as solution for idx
3. memoize

edge cases:
==============

1. undefined -> undefined
1. empty string -> empty
2. unique count === string length
3. unique count > string length
4. k <= 0 throw error


*/

const maxLength = xs => {
  let maxRange = undefined
  let maxRangeLength = -1

  for (const x of xs) {
    const [s, e] = x
    const range = e - s
    if (range > maxRangeLength) {
      maxRange = x
      maxRangeLength = range
    }
  }

  return maxRange
}

assert.deepEqual(maxLength([[0, 1], [0, 0], [1, 1]]), [0, 1])

const solveR = (xs, k) => {
  const m = new Map()

  const keyFor = (idx, s) => `${idx}_${s.size}`

  if (xs == null || k <= 0) {
    throw new Error(`Invalid input: s = ${xs} k = ${k}`)
  }

  if (k >= xs.length) {
    return xs
  }

  const dp = (idx, s, start, end) => {
    const key = keyFor(start, s)

    if (idx === xs.length) {
      return [start, end]
    }

    if (m.has(key)) {
      return m.get(key)
    }

    const c = xs[idx]

    const opts = [
      [start, end], // carry over
      dp(idx + 1, new Set([c]), idx, idx) // start new
    ]

    const setWithC = new Set([...Array.from(s), c])

    if (setWithC.size <= k) {
      opts.push(
        dp(idx + 1, setWithC, start, idx) // continue
      )
    }

    const res = maxLength(opts)
    m.set(key, res)
    return res
  }

  const [s, e] = dp(0, new Set(), 0, 0)
  return xs.substring(s, e + 1)
}

const solveI = (xs, k) => {
  // init array of single letter sets
  // for length from 1 to n
  //  append c to set
  //  determine if the new set size <= k
  //  update set and result if so
  //  otherwise set range as closed
  //  return longest range string if all ranges closed
  // return longest range string
}

test('solve', () => {
  const solve = solveR

  assert.equal(solve('aab', 1), 'aa')

  assert.equal(solve('baa', 1), 'aa') * assert.equal(solve('aaa', 1), 'aaa')
  assert.equal(solve('bcaa', 1), 'aa')
  assert.equal(solve('abcba', 2), 'bcb')

  // invalid input
  assert.throws(() => solve('a', 0))
  assert.throws(() => solve('a', -1))

  // range >= input
  assert.equal(solve('a', 1), 'a')
  assert.equal(solve('a', 2), 'a')

  // bigger input
  const singleCharM = new Array(20).fill('a').join('')
  assert.equal(solve(singleCharM + 'bbbbbb', 1), singleCharM)

  // large input
  const singleCharL = new Array(100).fill('a').join('')
  assert.equal(solve(singleCharL + 'bbbbbb', 1), singleCharL)
})
