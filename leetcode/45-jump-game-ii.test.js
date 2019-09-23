// https://leetcode.com/problems/jump-game-ii/

import test from 'ava'
import { memoizeWith } from '../helpers'

test('solves jump list', t => {
  t.is(solve([2, 3, 1, 1, 4]), 2)
})

test('solves jump list - with zero as value', t => {
  t.is(solve([2, 3, 1, 0, 4]), 2)
})

test('solves jump list - empty list', t => {
  t.is(solve([]), 0)
})

test('solves jump list - singleton', t => {
  t.is(solve([0]), 0)
  t.is(solve([1]), 0)
})

test('solves jump list - two items', t => {
  t.is(solve([1, 2]), 1)
  t.is(solve([2, 1]), 1)
})

test('solves jump list - large list', t => {
  const size = 50000
  t.is(solve(new Array(size).fill(1)), size - 1)
})

test.skip('solves jump list - large descending list', t => {
  const size = 25000
  const input = new Array(size).fill(1).map((_, idx) => size - idx)
  t.is(solve(input), 1)
})

test.skip('solves jump list - large descending list twice', t => {
  const size = 25000
  const list = new Array(size).fill(1).map((_, idx) => size - idx)
  t.is(solve(list.concat(list)), 2)
})

const solve = (jumps) =>
  solveI(jumps)
  // solveR(jumps)[0]

const solveI = (jumps) => {
  const len = jumps.length
  if (len <= 1) {
    return 0
  }

  const map = new Array(jumps.length).fill(Infinity)
  map[len - 1] = 0

  for (let idx = len - 2; idx >= 0; idx--) {
    let bestJump = Infinity
    for (let x = jumps[idx]; x >= 1; x--) {
      const prev = map[idx + x]
      const prevC = prev === undefined ? Infinity : prev
      bestJump = Math.min(prevC + 1, bestJump)
    }
    map[idx] = bestJump
  }

  return map[0]
}

const jumpOpts = length => new Array(length)
  .fill(0)
  .map((_, idx) => idx + 1)

const solveR = memoizeWith(
  (jumps, index) => `${jumps.join('_')}:${index}`,
  (jumps, index = 0) => {
    const leftToJump = jumps.length - index

    if (leftToJump <= 1) {
      return [0, index]
    }

    const opts = jumpOpts(jumps[index])
      .map(x => {
        const [sC, sIdx] = solveR(jumps, index + x)
        return [sC + 1, sIdx - x]
      })

    if (opts.length === 0) {
      return [Infinity, Infinity]
    }

    return opts.reduce(best)
  }
)

const best = ([bestCount, bestIdx], [curCount, curIdx]) => {
  if (curIdx < bestIdx) {
    return [curCount, curIdx]
  }

  if (curIdx === bestIdx && curCount < bestCount) {
    return [curCount, curIdx]
  }

  return [bestCount, bestIdx]
}
