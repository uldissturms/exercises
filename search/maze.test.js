import test from 'ava'
import bfs from './maze-bfs'
import {cell, dist} from './maze'

test('calculate distance', t => {
  t.is(dist({row: 1, col: 1}, {row: 4, col: 5}), 5)
})

test('empty path when already at destination', t => {
  const start = {row: 0, col: 0}
  const maze = { '0': { '0': cell } }
  t.deepEqual(bfs(start, start, maze), 0)
})

test('simple path for next step', t => {
  const start = {row: 0, col: 0}
  const end = {row: 0, col: 1}
  const maze = { '0': { '0': cell, '1': cell } }
  t.deepEqual(bfs(start, end, maze), 1)
})

test('no path returns undefined', t => {
  const start = {row: 0, col: 0}
  const end = {row: 0, col: 3}
  const maze = { '0': { '0': cell, '3': cell } }
  t.deepEqual(bfs(start, end, maze), undefined)
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
  t.deepEqual(bfs(start, end, maze), 15)
})
/* eslint-enable no-multi-spaces, standard/object-curly-even-spacing */
