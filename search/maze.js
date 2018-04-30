const {isNotUndefined, path} = require('../helpers')

const cell = 'x'

const eq = (l, r) =>
  l.row === r.row && l.col === r.col

const keyFor = ({row, col}) =>
  `${row}_${col}`

const findCell = (row, col, maze) =>
  isNotUndefined(path([row, col], maze))
    ? {row, col}
    : undefined

const childrenFor = ({row, col}, maze) => [
  findCell(row - 1, col, maze),
  findCell(row, col - 1, maze), findCell(row, col + 1, maze),
  findCell(row + 1, col, maze)
].filter(isNotUndefined)

const dist = (start, end) =>
  Math.sqrt((end.row - start.row) ** 2 + (end.col - start.col) ** 2)

module.exports = {
  cell,
  eq,
  keyFor,
  findCell,
  childrenFor,
  dist
}
