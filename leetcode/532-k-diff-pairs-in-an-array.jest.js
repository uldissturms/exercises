test('solve', () => {
  expect(solve([3, 1, 4, 1, 5], 2)).toEqual(2)
  expect(solve([1, 2, 3, 4, 5], 1)).toEqual(4)
  expect(solve([1, 3, 1, 5, 4], 0)).toEqual(1)
})

const keyFor = (x, y) => `${x}_${y}`

const solve = (ys, k) => {
  if (k < 0) {
    return 0
  }

  const m = new Map()
  const u = new Set()

  const lookupMatch = (i, y, xVal) => {
    const x = m.get(xVal)

    if (x != null && x !== i && !u.has(keyFor(xVal, y)) && !u.has(keyFor(y, xVal))) {
      u.add(keyFor(xVal, y))
    }
  }

  for (let i = 0; i < ys.length; i++) {
    const y = ys[i]
    m.set(y, i)
  }

  for (let i = 0; i < ys.length; i++) {

    const y = ys[i]

    lookupMatch(i, y, k + y)
    lookupMatch(i, y, -k + y)
  }

  return u.size
}
