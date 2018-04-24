import test from 'ava'
import {isNotUndefined, path} from '../helpers'

test('empty path when already at destination', t => {
  const start = {row: 0, col: 0}
  const maze = { '0': { '0': cell } }
  t.deepEqual(search(start, start, maze), 0)
})

test('simple path for next step', t => {
  const start = {row: 0, col: 0}
  const end = {row: 0, col: 1}
  const maze = { '0': { '0': cell, '1': cell } }
  t.deepEqual(search(start, end, maze), 1)
})

test('no path returns undefined', t => {
  const start = {row: 0, col: 0}
  const end = {row: 0, col: 3}
  const maze = { '0': { '0': cell, '3': cell } }
  t.deepEqual(search(start, end, maze), undefined)
})

/* eslint-disable no-multi-spaces, standard/object-curly-even-spacing */
test('more complex path', t => {
  const start = {row: 7, col: 4}
  const end = {row: 4, col: 2}
  const maze = {
    '0': { '0': cell, '1': cell, '2': cell, '3': cell, '4': cell, '5': cell, '6': cell },
    '1': { '0': cell,            '2': cell,            '4': cell, '5': cell, '6': cell },
    '2': { '0': cell,            '2': cell,            '4': cell, '5': cell, '6': cell },
    '3': { '0': cell,            '2': cell,            '4': cell, '5': cell, '6': cell },
    '4': { '0': cell, '1': cell, '2': cell,                       '5': cell, '6': cell },
    '5': { '0': cell,                       '3': cell, '4': cell, '5': cell, '6': cell },
    '6': { '0': cell,            '2': cell, '3': cell, '4': cell,            '6': cell },
    '7': {            '1': cell, '2': cell, '3': cell, '4': cell, '5': cell, '6': cell }
  }
  t.deepEqual(search(start, end, maze), 15)
})
/* eslint-enable no-multi-spaces, standard/object-curly-even-spacing */

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

const search = (start, end, maze) => {
  const extended = {}
  const q = [start]
  let level = 0
  while (q.length > 0) {
    const res = extendLevel(end, maze, level, q, extended)
    if (isNotUndefined(res)) {
      return res
    }
    level += 1
  }
  return undefined
}

const extendLevel = (end, maze, level, q, extended) => {
  let length = q.length
  for (let i = length; i > 0; i--) {
    const current = q.shift()
    if (extended[keyFor(current)]) {
      continue
    }
    if (eq(current, end)) {
      return level
    }

    extended[keyFor(current)] = true
    q.push(...childrenFor(current, maze))
  }

  return undefined
}
