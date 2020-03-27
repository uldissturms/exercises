// [https://app.codility.com/demo/results/trainingEJX2TA-43Y]

test('solve', () => {
  // example
  expect(solve([4, 4, 5, 5, 1], [3, 2, 4, 3, 1])).toEqual([5, 1, 8, 0, 1])

  // large input
  const maxFibN = 50000
  const maxPow = 30
  const res = solve(new Array(maxFibN).fill(maxFibN), new Array(maxFibN).fill(1))
  expect(res.every(x => x === 0)).toEqual(true)
})

const solve = (xs, ys) => {
  const maxX = Math.max(...xs)
  const maxY = Math.max(...ys)
  const modLimit = (1 << maxY) - 1

  const fib = new Array(maxX + 2).fill(0)
  fib[1] = 1
  for (let i = 2; i < fib.length; i++) {
    fib[i] = (fib[i - 1] + fib[i - 2]) & modLimit
  }

  return xs.map((x, i) => fib[x + 1] & (Math.pow(2, ys[i]) - 1))
}
