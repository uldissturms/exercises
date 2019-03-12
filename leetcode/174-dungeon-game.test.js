// [https://leetcode.com/problems/dungeon-game]

import test from 'ava'

test('dungeon game - solve', t => {
  const input = [
    [ -2, -3, 3 ],
    [ -5, -10, 1 ],
    [ 10, 30, -5 ]
  ]
  t.is(solve(input), 7)
})

test('dungeon game - edge cases', t => {
  t.is(solve([ ]), 1)
  t.is(solve([ [ ] ]), 1)
  t.is(solve([ [ 0 ] ]), 1)
  t.is(solve([ [ 1 ] ]), 1)
  t.is(solve([ [ -1 ] ]), 2)
})

const INIT_HEALTH = 0
const MIN_HEALTH = 1

// TODO: memoize to prune paths that had already been visited
const solve = (a) => {
  if (a.length === 0 || a[0].length === 0) {
    return MIN_HEALTH
  }

  const start = [ 0, 0 ]
  const end = [ a.length - 1, (a[0] || []).length - 1 ]
  return solveR(a, start, end, INIT_HEALTH, INIT_HEALTH)
}

const solveR = (a, [ cY, cX ], [ eY, eX ], current, initial) => {
  const val = a[cY][cX]
  const diff = current + val
  const newCurrent = Math.max(INIT_HEALTH, diff)
  const newInitial = diff <= 0 ? initial - diff : initial

  if (cY === eY && cX === eX) {
    return newInitial + MIN_HEALTH
  }

  const opts = []

  if (cX < eX) {
    opts.push(solveR(a, [ cY, cX + 1 ], [ eY, eX ], newCurrent, newInitial))
  }

  if (cY < eY) {
    opts.push(solveR(a, [ cY + 1, cX ], [ eY, eX ], newCurrent, newInitial))
  }

  return Math.min(...opts)
}
