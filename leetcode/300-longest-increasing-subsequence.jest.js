// [https://leetcode.com/problems/longest-increasing-subsequence]

test('solve', () => {
  expect(solve([10, 9, 2, 5, 3, 7, 101, 18])).toEqual(4)
})

test('solve - bs', () => {
  const xs = [1, 3, 5, 7]
  const sI = 0
  const eI = xs.length

  expect(bs(xs, sI, eI, 0)).toEqual(-1)
  expect(bs(xs, sI, eI, 1)).toEqual(0)
  expect(bs(xs, sI, eI, 2)).toEqual(1)
  expect(bs(xs, sI, eI, 3)).toEqual(1)
  expect(bs(xs, sI, eI, 4)).toEqual(2)
  expect(bs(xs, sI, eI, 5)).toEqual(2)
  expect(bs(xs, sI, eI, 6)).toEqual(3)
  expect(bs(xs, sI, eI, 7)).toEqual(3)
  expect(bs(xs, sI, eI, 8)).toEqual(4)
})

const bs = (xs, sI, eI, x) => {
  const mI = Math.floor((sI + eI) / 2)
  const mV = xs[mI]

  if (mV === x) {
    return mI
  }

  if (sI === eI) {
    return sI === 0 ? -1 : eI
  }

  if (x > mV) {
    return bs(xs, mI + 1, eI, x)
  }

  return bs(xs, sI, mI, x)
}

const solve = (xs) => {
  const dp = new Array(xs.length).fill(0)
  let len = 0

  for (const x of xs) {
    let i = bs(dp, 0, len, x)
    if (i < 0) {
      i = -(i + 1)
    }
    dp[i] = x
    if (i === len) {
      len++
    }
  }
  return len
}
