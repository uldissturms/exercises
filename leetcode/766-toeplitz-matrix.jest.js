// [https://leetcode.com/problems/toeplitz-matrix]

test('solve', () => {
  expect(solve([[1, 2, 3]])).toEqual(true)
  expect(solve([[1, 2, 3], [4, 1, 2]])).toEqual(true)
  expect(solve([
    [1, 2, 3, 4],
    [5, 1, 2, 3],
    [9, 5, 1, 2]])).toEqual(true)
  expect(solve([[1, 2], [2, 2]])).toEqual(false)
})

const solveRowByRow = (xs) => {
  for (let i = 1; i < xs.length; i++) {
    const ref = xs[i - 1]
    const cur = xs[i]

    for (let j = 1; j < cur.length; j++) {
      if (cur[j] !== ref[j - 1]) {
        return false
      }
    }

  }

  return true
}

const solveDiagonals = (xs) => {
  const check = (x, y, v) => {
    while (x < xs.length && y < xs[x].length) {
      if (xs[x][y] !== v) {
        return false
      }

      x++
      y++
    }

    return true
  }

  // rows
  for (let i = 0; i < xs.length; i++) {
    if (!check(i, 0, xs[i][0])) {
      return false
    }
  }

  // columns
  for (let i = 1; i < xs[0].length; i++) {
    if (!check(0, i, xs[0][i])) {
      return false
    }
  }

  return true
}

const solve = solveDiagonals
