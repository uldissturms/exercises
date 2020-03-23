// [https://leetcode.com/problems/n-queens]

test('solve', () => {
  expect(solve(1)).toEqual([['Q']])
  expect(solve(2)).toEqual([])
  expect(solve(3)).toEqual([])
  expect(solve(4)).toEqual([
    ['.Q..', '...Q', 'Q...', '..Q.'],
    ['..Q.', 'Q...', '...Q', '.Q..']
  ])
})

const queen = 'Q'
const empty = '.'

const solve = n => {
  if (n <= 0) {
    return 0
  }

  const res = []
  const board = []

  const dfs = () => {
    if (board.length === n) {
      res.push([...board])
      return
    }

    for (let i = 0; i < n; i++) {
      if (isValid(board, i)) {
        board.push(i)
        dfs()
        board.pop()
      }
    }
  }

  dfs()

  return res.map(xs =>
    xs.map(x =>
      new Array(n)
        .fill(empty)
        .map((y, yIdx) => (yIdx === x ? queen : empty))
        .join('')
    )
  )
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
