/*
 * Game - https://www.mathsisfun.com/games/towerofhanoi.html
 * Prolog - https://www.cpp.edu/~jrfisher/www/prolog_tutorial/2_3.html
 * Prolog (github) - https://github.com/dvberkel/prolog-hanoi
 */

import test from 'ava'
import { clone, id } from '../helpers'

let count = 0

const countMoves = (t) => {
  count += 1
}

test.beforeEach(t => {
  count = 0
})

test('tower of hanoi - 1', t => {
  t.deepEqual(
    solve([
      clone([1]), [], [] ],
      countMoves
    ),
    [ [], [], clone([1]) ]
  )
  t.is(count, 1)
})

test('tower of hanoi - 2', t => {
  t.deepEqual(
    solve(
      [ clone([1, 2]), [], [] ],
      countMoves
    ),
    [ [], [], clone([1, 2]) ]
  )
  t.is(count, 3)
})

test('tower of hanoi - 3', t => {
  const towerOf3 = [1, 2, 3]
  t.deepEqual(
    solve(
      [ clone(towerOf3), [], [] ],
      countMoves
    ),
    [ [], [], clone(towerOf3) ]
  )
  t.is(count, 7)
})

test('tower of hanoi - 5', t => {
  const towerOf5 = [1, 2, 3, 4, 5]
  t.deepEqual(
    solve(
      [ clone(towerOf5), [], [] ],
      countMoves
    ),
    [ [], [], clone(towerOf5) ]
  )
  t.is(count, 31)
})

const left = (tower) => tower[0]
const center = (tower) => tower[1]
const right = (tower) => tower[2]

const solve = (tower, onMove = id) => {
  const [first] = tower
  const levels = first.length
  move(levels - 1, left, right, center, tower, onMove)
  return tower
}

/* manual solution

 * one (moves: 1)
 * [1], [], []
 *
 * [], [], [1]
 *
 * two (moves: 3)
 * [1, 2], [], []

 * [2], [1], []
 * [], [1], [2]
 * [], [], [1, 2]

 * three (moves: 7)
 * [1, 2, 3], [], []

 * [2, 3], [], [1]
 * [3], [2], [1]
 * [3], [1, 2], []
 * [], [1, 2], [3]
 * [1], [2], [3]
 * [1], [], [2, 3]
 * [], [], [1, 2, 3]

*/

const move = (index, left, right, center, tower, onMove) => {
  if (index === 0) {
    const item = left(tower).pop()
    right(tower).push(item)
    onMove()
    return
  }

  move(index - 1, left, center, right, tower, onMove)
  move(0, left, right, center, tower, onMove)
  move(index - 1, center, right, left, tower, onMove)
}
