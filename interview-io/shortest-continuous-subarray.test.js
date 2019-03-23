import test from 'ava'
import { isUndefined, isNotUndefined } from '../helpers'

test('shortest continuous subarray - brute force', t => {
  const input = [1, 2, 2, 5, 4, 0, 1, 1, 2, 2, 0, 3, 3]
  const expected = [1, 2, 2, 0, 3]
  const set = new Set([1, 2, 3])
  t.deepEqual(solveBruteForce(input, set), expected)
})

test('shortest continuous subarray - optimized', t => {
  const input = [1, 2, 2, 5, 4, 0, 1, 1, 2, 2, 0, 3, 3]
  const expected = [1, 2, 2, 0, 3]
  const set = new Set([1, 2, 3])
  t.deepEqual(solveOptimised(input, set), expected)
})

/*

manual solution

input:
[1, 2, 2, 5, 4, 0, 1, 1, 2, 2, 0, 3, 3]
set: { 1 2 3 }

output:
[1, 2, 2, 0, 3]

 0  1  3  4  5  6  7  8  9 10  11 12 13
[1, 2, 2, 5, 4, 0, 1, 1, 2, 2, 0, 3, 3]
from left:
 1  1  1  1  1  1  1  1  1  1  1  1  1
    2  2  2  2  2  2  2  2  2  2  2  2
                                  3  3

                            from right
 3  3  3  3  3  3  3  3  3  3  3  3  3
 2  2  2  2  2  2  2  2  2  2
 1  1  1  1  1  1  1  1

*/

const solveOptimised = (input, set) => {
  const fromL = solveSide(0, x => x < input.length, x => x + 1, input, set)
  const fromR = solveSide(input.length - 1, x => x >= 0, x => x - 1, input, set)

  return fromL && fromR && input.slice(fromR, fromL + 1)
}

const solveSide = (fromIdx, clause, fn, input, set) => {
  const tmp = new Set()
  for (let i = fromIdx; clause(i); i = fn(i)) {
    const cur = input[i]
    if (set.has(cur)) {
      tmp.add(cur)
    }
    if (tmp.size === set.size) {
      return i
    }
  }
}

const solveBruteForce = (input, set) => {
  let shortest
  for (const x in input) {
    const tmp = solveForIdx(input, set, x)
    if (isNotUndefined(tmp) && (isUndefined(shortest) || shortest.length > tmp.length)) {
      shortest = tmp
    }
  }
  return shortest
}

const solveForIdx = (input, set, startIdx) => {
  let tmpSet = new Set()
  let tmpArr = []
  for (let idx = startIdx; idx < input.length; idx++) {
    const cur = input[idx]
    tmpArr.push(cur)
    if (set.has(cur)) {
      tmpSet.add(cur)
    }
    if (tmpSet.size === set.size) {
      return tmpArr
    }
  }
}
