const assert = require('assert')

/*

manually:
=========

[4, 3, 4, 4, 4, 2]

indices: 0, 2

[4] [3, 4, 4, 4, 2]
[4, 3, 4] [4, 4, 2]

1. leader is element that must occur more than half times - means there is only one result
2. total leader has to be leader in each of the sub arrays

[4, 3, 4, 4, 4, 2]
 y, n, y, y, y, y
 y, y, y, y, n, n


solve:
===========

1. determine leader
2. for ltr and rtl determine if at this point the global leader would be regional leader
3. for each index for ltr and rtl
   increment equi leader count if index is regional leader for ltr and rtl

edge cases:
==============

1. no global leader - return 0
2. length < 2 - return 0

*/

const solve = xs => {
  const len = xs.length

  if (len < 2) {
    return 0
  }

  const globalLeader = xs => {
    const m = new Map()
    for (const x of xs) {
      const count = (m.get(x) || 0) + 1
      m.set(x, count)
      if (count > len / 2) {
        return x
      }
    }

    return undefined
  }

  const l = globalLeader(xs)
  if (l == null) {
    return 0
  }

  const ltr = new Array(len).fill(false)
  const rtl = new Array(len).fill(false)

  let countLtr = 0
  let countRtl = 0

  for (let i = 0; i < len; i++) {
    countLtr += xs[i] === l ? 1 : 0
    const isLocalLeader = countLtr > (i + 1) / 2
    ltr[i] = isLocalLeader
  }

  for (let i = len - 1; i >= 0; i--) {
    countRtl += xs[i] === l ? 1 : 0
    const isLocalLeader = countRtl > (len - i) / 2
    rtl[i] = isLocalLeader
  }

  return ltr.filter((x, idx) => x === true && rtl[idx + 1] === true).length
}

test('solve', () => {
  // solved in coderpad
  assert.equal(solve([]), 0)
  assert.equal(solve([1]), 0)
  assert.equal(solve([1, 2]), 0)
  assert.equal(solve([1, 1]), 1)

  // test case
  assert.equal(solve([4, 3, 4, 4, 4, 2]), 2)
})
