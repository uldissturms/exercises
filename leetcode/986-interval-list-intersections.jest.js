// [https://leetcode.com/problems/interval-list-intersections]

test('solve', () => {
  expect(
    solve(
      [[0, 2], [5, 10], [13, 23], [24, 25]],
      [[1, 5], [8, 12], [15, 24], [25, 26]]
    )
  ).toEqual([[1, 2], [5, 5], [8, 10], [15, 23], [24, 24], [25, 25]])
})

const solve = (xs, ys) => {
  let xI = 0
  let yI = 0
  const res = []

  while (xI < xs.length && yI < ys.length) {
    const [xS, xE] = xs[xI]
    const [yS, yE] = ys[yI]
    const cS = Math.max(xS, yS)
    const cE = Math.min(xE, yE)

    if (cE >= cS) {
      res.push([cS, cE])
    }

    if (xE <= yE) {
      xI++
    } else {
      yI++
    }
  }

  return res
}

/*
Input:

A = [[0,2],[5,10],[13,23],[24,25]]
B = [[1,5],[8,12],[15,24],[25,26]]

Output:
    [[1,2],[5,5],[8,10],[15,23],[24,24],[25,25]]
*/

