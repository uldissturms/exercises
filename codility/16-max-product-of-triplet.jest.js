test('solve', () => {
  expect(solve([-3, 1, 2, -2, 5, 6])).toEqual(60)
  expect(solve([-5, 5, -5, 4])).toEqual(125)
})

/*
reasoning:

max triplet will be either:
1. for 3 max values
2. 1 max and 2 min values
*/

/*
solve:
1. find 3 max and 2 min indices
2. return product
*/

const solve = xs => {
  const maxOneIdx = findMax(xs, new Set([]))
  const maxTwoIdx = findMax(xs, new Set([maxOneIdx]))
  const maxThreeIdx = findMax(xs, new Set([maxOneIdx, maxTwoIdx]))

  const minOneIdx = findMin(xs, new Set([maxOneIdx]))
  const minTwoIdx = findMin(xs, new Set([maxOneIdx, minOneIdx]))

  const opts = [
    [maxOneIdx, maxTwoIdx, maxThreeIdx],
    [maxOneIdx, minOneIdx, minTwoIdx],
  ].map(ys =>
    ys.map(x => xs[x]).reduce((x, y) => x * y, 1)
  )

  return Math.max(...opts)
}

const findMax = (xs, exceptIdxs) => {
  let maxVal = -Infinity
  let maxIdx = 0

  for (let i = 0; i < xs.length; i++) {
    const cur = xs[i]
    if (!exceptIdxs.has(i) && cur > maxVal) {
      maxVal = cur
      maxIdx = i
    }
  }
  return maxIdx
}

const findMin = (xs, exceptIdxs) => {
  let maxVal = Infinity
  let maxIdx = 0

  for (let i = 0; i < xs.length; i++) {
    const cur = xs[i]
    if (!exceptIdxs.has(i) && cur < maxVal) {
      maxVal = cur
      maxIdx = i
    }
  }
  return maxIdx
}
