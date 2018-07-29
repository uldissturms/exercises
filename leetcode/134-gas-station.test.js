// [https://leetcode.com/problems/gas-station/]

import test from 'ava'

test('cannot travel', t => {
  t.is(solve([2, 3, 4], [3, 4, 3]), -1)
  t.is(solve([2], [3]), -1)
})

test('first petrol station', t => {
  t.is(solve([1, 2, 3, 4, 5], [3, 4, 5, 1, 2]), 3)
  t.is(solve([2], [1]), 0)
})

const adjust = (len, idx) =>
  idx % len

const change = (gas, cost, idx) =>
  gas[adjust(gas.length, idx)] - cost[adjust(cost.length, idx)]

const NOT_FOUND = -1

const solve = (gas, cost, start = 0, idx = 0, balance = 0) => {
  if (start >= gas.length) {
    return NOT_FOUND
  }

  const newBalance = balance + change(gas, cost, idx)

  if (newBalance < 0) {
    return solve(gas, cost, idx + 1, idx + 1, 0)
  }

  if (idx - start === gas.length - 1) {
    return start
  }

  return solve(gas, cost, start, idx + 1, newBalance)
}
