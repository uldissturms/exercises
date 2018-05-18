// [https://leetcode.com/problems/triangle]

import test from 'ava'

/* eslint-disable indent */
const triangle = [
     [ 2 ],
    [ 3, 4 ],
   [ 6, 5, 7 ],
  [ 4, 1, 8, 3 ]
]
/* eslint-enable indent */

test('min path - brute force', t => {
  t.is(minPathR(triangle), 11)
})

test('min path - optimal', t => {
  t.is(minPathO(triangle), 11)
})

test('single line triangle', t => {
  t.is(minPathO([[-10]]), -10)
})

test('edge cases', t => {
  t.is(minPathO([[-1], [-2, -3]]), -4)
  t.is(minPathO([[-1], [2, 3], [1, -1, -3]]), -1)
})

/* Optimal O(n), n - number of elements in triangle */
const minPathO = t =>
  optimal(t.length - 2, t[t.length - 1], t)

const optimal = (row, totals, t) => {
  if (row === -1) {
    return Math.min(...totals)
  }

  return optimal(
    row - 1,
    t[row].map((x, i) => x + Math.min(totals[i], totals[i + 1])),
    t)
}
/* End */

/* Brute force - recursion O(2^n) */
const pick = (row, col, t) => {
  if (row >= t.length) {
    return 0
  }

  if (row === t.length - 1) {
    return t[row][col]
  }

  const cur = t[row][col]
  const res = Math.min(
    pick(row + 1, col, t) + cur,
    pick(row + 1, col + 1, t) + cur
  )
  return res
}

const minPathR = t =>
  pick(0, 0, t)

/* End */
