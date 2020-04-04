// [https://app.codility.com/demo/results/trainingX4MUDY-J28]
test('solve', () => {
  // simple
  expect(solve([-1, 1, 2])).toEqual(2)

  // all negative
  expect(solve([-4, -10, -7])).toEqual(-11)

  // all positive
  expect(solve([4, 10, 7])).toEqual(21)

  // must take at least one from every 6th
  expect(solve([1, -1, -2, -3, -4, -5, -6, 2])).toEqual(2)

  // 2 items
  expect(solve([1, 2])).toEqual(3)
  expect(solve([1, -2])).toEqual(-1)
  expect(solve([-1, 2])).toEqual(1)

  // example
  expect(solve([1, -2, 0, 9, -1, -2])).toEqual(8)
  expect(solve([1, -2, 4, 3, -1, -3, -7, 4, -9])).toEqual(3)

})

test('solve - large', () => {
  // large
  const maxNum = 100000
  const largeNegative = new Array(maxNum).fill(-10000)
  expect(solve(largeNegative)).toEqual(-166680000)
})

const solve = xs => {
  const len = xs.length
  const ds = [1, 2, 3, 4, 5, 6]

  const dp = new Array(xs.length).fill(-Infinity)
  dp[0] = xs[0]

  for (let i = 1; i <= len; i++) {
    for (let d of ds) {
      if (i - d >= 0) {
        dp[i] = Math.max(dp[i], dp[i - d] + xs[i])
      }
    }
  }

  return dp[xs.length - 1]
}
