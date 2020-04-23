// [https://leetcode.com/problems/sparse-matrix-multiplication]

test('solve', () => {
  expect(
    solve([[1, 0, 0], [-1, 0, 3]], [[7, 0, 0], [0, 0, 0], [0, 0, 1]])
  ).toEqual([[7, 0, 0], [-7, 0, 3]])
  expect(solve([[1, -5]], [[12], [-1]])).toEqual([[17]])
})

const solve = (as, bs) => {
  const res = new Array(as.length)
    .fill(0)
    .map(x => new Array(bs[0].length).fill(0))

  const calc = (ar, bc) => {
    let s = 0
    for (let i = 0; i < as[ar].length; i++) {
      s += as[ar][i] * bs[i][bc]
    }
    return s
  }

  for (let i = 0; i < res.length; i++) {
    for (let j = 0; j < res[i].length; j++) {
      res[i][j] = calc(i, j)
    }
  }

  return res
}
