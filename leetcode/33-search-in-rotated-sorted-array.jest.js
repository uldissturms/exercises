// [https://leetcode.com/problems/search-in-rotated-sorted-array]

test('solve', () => {
  expect(solve([4, 5, 6, 7, 0, 1, 2], 0)).toEqual(4)
  expect(solve([4, 5, 6, 7, 0, 1, 2], 4)).toEqual(0)
  expect(solve([4, 5, 6, 7, 0, 1, 2], 2)).toEqual(6)
  expect(solve([5, 6, 0, 1, 2, 3, 4], 0)).toEqual(2)

  // non-existing element
  expect(solve([4, 5, 6, 7, 0, 1, 2], 3)).toEqual(-1)

  // not shifted
  const len = 7
  const notShifted = new Array(len).fill(0).map((_, i) => i)
  for (let i = 0; i < len; i++) {
    expect(solve(notShifted, i)).toEqual(i)
  }

  // empty
  expect(solve([], 0)).toEqual(-1)

  // single item
  expect(solve([0], 0)).toEqual(0)
  expect(solve([1], 0)).toEqual(-1)

  // two items
  expect(solve([1, 0], 0)).toEqual(1)
  expect(solve([1, 0], 1)).toEqual(0)
})

const defaultTo = (x, o) => (o == null ? x : o)

const NOT_FOUND = -1

const solve = (xs, num) => {
  const len = xs.length

  const bsShift = (sI, eI) => {
    const mI = Math.floor((sI + eI) / 2)
    const mV = xs[mI]
    const sV = xs[sI]
    const eV = xs[eI]

    if ((sI + 1) >= eI) {
      return sV > eV ? eI : undefined
    }

    if (mV < sV) {
      return bsShift(sI, mI)
    }

    return bsShift(mI, eI)
  }

  const shift = defaultTo(0, bsShift(0, len))

  const adjustForShift = x => (x + shift) % len

  const bsNum = (sI, eI) => {
    const mI = Math.floor((sI + eI) / 2)
    const mAI = adjustForShift(mI)
    const mV = xs[mAI]

    if (mV === num) {
      return mAI
    }

    if (sI >= eI) {
      return undefined
    }

    if (mV < num) {
      return bsNum(mI + 1, eI)
    }

    return bsNum(sI, mI - 1)
  }

  return defaultTo(NOT_FOUND, bsNum(0, len - 1))
}
