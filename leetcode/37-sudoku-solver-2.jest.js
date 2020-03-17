const empty = '.'

const optionsFor = (i, j, squareSize, xs) => {
  const boardSize = squareSize ** 2
  const s = new Set(
    new Array(boardSize)
      .fill(0)
      .map((_, i) => i + 1)
      .map(x => x.toString())
  )
  for (let x = 0; x < boardSize; x++) {
    s.delete(xs[i][x])
    s.delete(xs[x][j])
  }
  for (const [ci, cj] of squareFor(i, j, squareSize)) {
    s.delete(xs[ci][cj])
  }
  return Array.from(s)
}

const byOptions = ([xIdx, xOpts], [yIdx, yOpts]) => {
  return xOpts.length - yOpts.length
}

const squareFor = (i, j, squareSize) => {
  const [si, sj] = [
    Math.floor(i / squareSize) * squareSize,
    Math.floor(j / squareSize) * squareSize
  ]

  return new Array(squareSize)
    .fill(0)
    .flatMap((_, i) =>
      new Array(squareSize).fill(0).map((_, j) => [si + i, sj + j])
    )

  return changes
}

const solve = (squareSize, xs) => {
  const boardSize = squareSize ** 2
  const numberOfCells = boardSize ** 2

  const dfs = (xs, num) => {
    if (num === numberOfCells) {
      return true
    }

    const cells = cellsWithConstraints(squareSize, xs)

    const [firstCell] = cells
    const [, firstCellOpts] = firstCell

    if (firstCellOpts.length === 0) {
      return false
    }

    for (const [[i, j], options] of cells) {
      for (const o of options) {
        xs[i][j] = o
        if (dfs(xs, num + 1)) {
          return true
        }
      }
      xs[i][j] = empty
    }
  }

  return dfs(xs, solved(xs))
}

const solved = xs => {
  return xs.flatMap(x => x).filter(x => x !== empty).length
}

const cellsWithConstraints = (squareSize, xs) => {
  return xs
    .flatMap((x, i) => x.map((y, j) => [i, j]))
    .filter(([i, j]) => xs[i][j] === empty)
    .map(([i, j]) => [[i, j], optionsFor(i, j, squareSize, xs)])
    .sort(byOptions)
}

const input = [
  // 0   1    2    3    4    5    6    7    8
  ['5', '3', '.', '.', '7', '.', '.', '.', '.'], // 0
  ['6', '.', '.', '1', '9', '5', '.', '.', '.'], // 1
  ['.', '9', '8', '.', '.', '.', '.', '6', '.'], // 2
  ['8', '.', '.', '.', '6', '.', '.', '.', '3'], // 3
  ['4', '.', '.', '8', '.', '3', '.', '.', '1'], // 4
  ['7', '.', '.', '.', '2', '.', '.', '.', '6'], // 5
  ['.', '6', '.', '.', '.', '.', '2', '8', '.'], // 6
  ['.', '.', '.', '4', '1', '9', '.', '.', '5'], // 7
  ['.', '.', '.', '.', '8', '.', '.', '7', '9'] // 8
]

const output = [
  // 0   1    2    3    4    5    6    7    8
  ['5', '3', '4', '6', '7', '8', '9', '1', '2'], // 0
  ['6', '7', '2', '1', '9', '5', '3', '4', '8'], // 1
  ['1', '9', '8', '3', '4', '2', '5', '6', '7'], // 2
  ['8', '5', '9', '7', '6', '1', '4', '2', '3'], // 3
  ['4', '2', '6', '8', '5', '3', '7', '9', '1'], // 4
  ['7', '1', '3', '9', '2', '4', '8', '5', '6'], // 5
  ['9', '6', '1', '5', '3', '7', '2', '8', '4'], // 6
  ['2', '8', '7', '4', '1', '9', '6', '3', '5'], // 7
  ['3', '4', '5', '2', '8', '6', '1', '7', '9'] // 8
]

const clone = x => JSON.parse(JSON.stringify(x))

test('solve 9x9', () => {
  const data = clone(input)
  solve(3, data)
  expect(data).toEqual(output)
})

test.only('solve 4x4', () => {
  const data = [
    ['1', '.', '3', '4'],
    ['4', '3', '2', '.'],
    ['2', '.', '.', '3'],
    ['.', '4', '.', '2'],
  ]
  const expected = [
    ['1', '2', '3', '4'],
    ['4', '3', '2', '1'],
    ['2', '1', '4', '3'],
    ['3', '4', '1', '2'],
  ]
  solve(2, data)
  expect(data).toEqual(expected)
})
