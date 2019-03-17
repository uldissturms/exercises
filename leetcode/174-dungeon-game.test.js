// [https://leetcode.com/problems/dungeon-game]

import test from 'ava'
import { big } from './174-dungeon-game.data'
import { isNotUndefined } from '../helpers'

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

test('dungeon game - extra cases', t => {
  t.is(solve([[3, -20, 30], [-3, 4, 0]]), 1)
})

test('dungeon game - big data set', t => {
  t.is(solve(big), 85)
})

const MIN_HEALTH = 1

const solve = (a) => {
  if (a.length === 0 || a[0].length === 0) {
    return MIN_HEALTH
  }

  return solveR(a, [0, 0], {})
}

const solveR = (a, [y, x], map) => {
  const [eY, eX] = [a.length - 1, a[0].length - 1]

  if (y > eY || x > eX) {
    return Number.POSITIVE_INFINITY
  }

  const val = a[y][x]

  if (y === eY && x === eX) {
    return Math.max(MIN_HEALTH, MIN_HEALTH - val)
  }

  const cacheKey = keyFor(y, x)
  const cached = map[cacheKey]

  if (isNotUndefined(cached)) {
    return cached
  }

  const goRight = solveR(a, [y, x + 1], map)
  const goDown = solveR(a, [y + 1, x], map)

  return cacheAndReturn(
    cacheKey,
    Math.max(
      MIN_HEALTH,
      Math.min(goRight, goDown) - val
    ),
    map
  )
}

const keyFor = (y, x) =>
  `${y}_${x}`

const cacheAndReturn = (key, value, map) => {
  map[key] = value
  return value
}
