test('solve', () => {
  expect(solve([])).toEqual(-1)

  expect(solve([0])).toEqual(0)
  expect(solve([1])).toEqual(-1)
  expect(solve([-1, 1])).toEqual(1)
  expect(solve([-1, 1, 4])).toEqual(1)
  expect(solve([-1, 0, 1, 3])).toEqual(3)

  expect(solve([-8, 0, 2, 5])).toEqual(2)
  expect(solve([-1, 0, 3, 6])).toEqual(-1)
  expect(solve([-5, 0, 2, 3, 10, 29])).toEqual(2)
  expect(solve([0, 1, 2, 3, 5, 6, 7])).toEqual(0)
})


const solveR = xs => {
  const bs = (sI, eI) => {
    const mI = Math.floor((sI + eI) / 2)
    const mV = xs[mI]

    if (sI > eI) {
      return -1
    }

    if (sI === eI) {
      const sV = xs[sI]
      return sV === sI ? sI : -1
    }

    if (mI === mV) {
      return bs(sI, mI)
    }

    if (mV > mI) {
      return bs(sI, mI - 1)
    }

    return bs(mI + 1, eI)
  }

  return bs(0, xs.length - 1)
}

const solveI = xs => {
  const len = xs.length
  let sI = 0
  let eI = len - 1

  while (sI <= eI) {
    const mI = Math.floor((sI + eI) / 2)
    const mV = xs[mI]

    if (sI === eI) {
      return mI === mV ? mI : -1
    }

    if (mV === mI) {
      eI = mI
    } else if (mV > mI) {
      eI = mI - 1
    } else {
      sI = mI + 1
    }
  }

  return -1
}

const solve = solveI
