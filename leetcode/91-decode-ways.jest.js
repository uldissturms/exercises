// [https://leetcode.com/problems/decode-ways]

const fib = num => {
  var a = 1,
    b = 0,
    temp

  while (num >= 0) {
    temp = a
    a = a + b
    b = temp
    num--
  }

  return b
}

test('solve', () => {
  // simple
  expect(solve('1')).toEqual(fib(1)) // 1
  expect(solve('11')).toEqual(fib(2)) // 2
  expect(solve('19')).toEqual(fib(2)) // 2
  expect(solve('111')).toEqual(fib(3)) // 3
  expect(solve('1111')).toEqual(fib(4)) // 5
  expect(solve(new Array(10).fill('1').join(''))).toEqual(fib(10)) // 89

  // case where a letter would not be valid
  expect(solve('27')).toEqual(1)
  expect(solve('161')).toEqual(2)

  // edge cases
  expect(solve('0')).toEqual(0)
  expect(solve('10')).toEqual(1)
  expect(solve('100')).toEqual(0)
  expect(solve('110')).toEqual(1)
  expect(solve('1001')).toEqual(0)
  expect(solve('-1')).toEqual(0)
  expect(solve('x')).toEqual(0)
})

test('solve - time', () => {
  expect(solve(new Array(1000).fill('1').join(''))).toEqual(fib(1000))
})

test('solve - large input', () => {
  const largeInput = new Array(100).fill('1').join('')
  expect(solve(largeInput)).toEqual(fib(100))
})

const isUndefined = x => typeof x === 'undefined'
const sum = (x, y) => x + y

const valid = xs => {
  // starts with zero
  if (xs[0] === '0') {
    return false
  }

  // non integers
  for (const x of xs) {
    const n = parseInt(x, 10)
    if (isNaN(n)) {
      return false
    }
  }

  // two consecutive zeroes
  for (let i = 0; i < xs.length - 1; i++) {
    const cur = xs[i]
    const next = xs[i + 1]
    if (cur + next === '00') {
      return false
    }
  }

  return true
}


const solveR = (xs, idx = 0, m = new Map()) => {
  if (!valid(xs)) {
    return 0
  }
  const dp = (xs, idx = 0, m = new Map()) => {
    if (m.has(idx)) {
      return m.get(idx)
    }

    if (idx >= xs.length - 1) {
      return 1
    }

    const cc = xs[idx]
    const cn = xs[idx + 1]
    const cnn = xs[idx + 2]
    const nn = cn && parseInt(cc + cn, 10)

    const res = [
      nn && nn <= 26 && (isUndefined(cnn) || cnn !== '0')
        ? dp(xs, idx + 2, m)
        : 0,
      isUndefined(cn) || cn !== '0' ? dp(xs, idx + 1, m) : 0
    ].reduce(sum, 0)

    m.set(idx, res)

    return res
  }

  return dp(xs)
}

const solveI = xs => {

  const len = xs.length

  let oneBack = 1
  let twoBack = 1

  let res = 1

  for (let i = len - 1; i >= 0; i--) {
    const c = xs[i]
    const cn = xs[i + 1]

    if (c < '0' || c > '9') {
      return 0
    }

    if (c === '0') {
      res = 0
    } else if (c === '1' && cn != null) {
      res = oneBack + twoBack
    } else if (c === '2' && cn != null && cn < '7') {
      res = oneBack + twoBack
    } else {
      res = oneBack
    }

    twoBack = oneBack
    oneBack = res
  }

  return res
}

const solve = solveI
