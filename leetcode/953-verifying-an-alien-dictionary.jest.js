// [https://leetcode.com/problems/verifying-an-alien-dictionary]

test('create dict', () => {
  expect(rank('abcdef')).toEqual({ a: 0, b: 1, c: 2, d: 3, e: 4, f: 5 })
})

test('fromEntries', () => {
  expect(fromEntries([['a', 1], ['b', 2], ['c', 3]])).toEqual({
    a: 1,
    b: 2,
    c: 3
  })
})

test('solve - in order', () => {
  const words = ['hello', 'leetcode']
  const order = 'hlabcdefgijkmnopqrstuvwxyz'
  expect(solve(words, order)).toBe(true)
})

test('solve - out of order', () => {
  const words = ['word', 'world', 'row']
  const order = 'worldabcefghijkmnpqstuvxyz'
  expect(solve(words, order)).toBe(false)
})

test('solve - simple', () => {
  expect(solve(['a', 'b'], 'ab')).toBe(true)
  expect(solve(['a', 'ba'], 'ab')).toBe(true)
  expect(solve(['a', 'bac'], 'abc')).toBe(true)
  expect(solve(['aa', 'b'], 'abc')).toBe(true)
  expect(solve(['b', 'a'], 'ab')).toBe(false)
  expect(solve(['a', 'c', 'b'], 'abc')).toBe(false)
  expect(solve(['aa', 'aa'], 'a')).toBe(true)
  expect(solve(['aa', 'ab'], 'ab')).toBe(true)
  expect(solve(['ab', 'aa'], 'ab')).toBe(false)
  expect(solve(['abc', 'ba'], 'abc')).toBe(true)
  expect(solve(['abc', 'bac'], 'abc')).toBe(true)
})

const UNDEFINED_RANK = -1
const fromEntries = arr => arr.reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {})
const rank = dict => fromEntries([...dict].map((x, idx) => [x, idx]))
const isUndefined = x => typeof x === 'undefined'
const defaultTo = (x, y) => (isUndefined(y) ? x : y)

const lessThan = (prev, curr, r) => {
  // for each character
  for (let j = 0; j < prev.length; j++) {
    const prevC = prev[j]
    const currC = curr[j]

    const prevR = defaultTo(UNDEFINED_RANK, r[prevC])
    const currR = defaultTo(UNDEFINED_RANK, r[currC])

    if (currR > prevR) {
      return true
    }

    if (currR < prevR) {
      return false
    }
  }
  return true
}

const solve = (ws, o) => {
  const r = rank(o)

  // for each word
  for (let i = 1; i < ws.length; i++) {
    if (!lessThan(ws[i - 1], ws[i], r)) {
      return false
    }
  }
  return true
}
