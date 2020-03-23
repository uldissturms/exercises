// [https://leetcode.com/problems/n-queens-ii]

test('solve', () => {
  expect(solve(1)).toEqual(1)
  expect(solve(2)).toEqual(0)
  expect(solve(3)).toEqual(0)
  expect(solve(4)).toEqual(2)
  expect(solve(8)).toEqual(92)
})

const solve = (n, board = []) => {
  if (n <= 0) {
    return 0
  }

  if (board.length === n) {
    return 1
  }

  let count = 0

  for (let i = 0; i < n; i++) {
    if (isValid(board, i)) {
      board.push(i)
      count += solve(n, board)
      board.pop()
    }
  }

  return count
}

const isValid = (board, lastCol) => {
  const lastRow = board.length

  for (let row = 0; row < lastRow; row++) {
    const col = board[row]

    // same column
    if (col === lastCol) {
      return false
    }

    // on same diagonal
    const rowDiff = lastRow - row

    if (col - rowDiff === lastCol || col + rowDiff === lastCol) {
      return false
    }

  }

  return true
}
