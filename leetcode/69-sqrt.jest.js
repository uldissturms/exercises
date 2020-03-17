test('solve', () => {
  expect(solve(0)).toEqual(0)
  expect(solve(1)).toEqual(1)
  expect(solve(2)).toEqual(1)
  expect(solve(3)).toEqual(1)
  expect(solve(4)).toEqual(2)
  expect(solve(8)).toEqual(2)
  expect(solve(9)).toEqual(3)
})

test('solve - extra', () => {
  expect(solve(0.25)).toEqual(0)
  expect(root(0.25, 2)).toEqual(0.5)
})

const solve = x => Math.floor(root(x, 2))

const root = (x, n) => {
  const start = 0
  const end = x

  const precision = 0.001

  const withinPrecision = x => Math.abs(x) < precision

  const bs = (start, end) => {

    if (withinPrecision(Math.pow(start, n) - x)) {
      return start
    }

    if (withinPrecision(Math.pow(end, n) - x)) {
      return end
    }

    const middle = (end + start) / 2
    const res = Math.pow(middle, n)

    if (withinPrecision(res - x)) {
      return middle
    }

    if (res > x) {
      return bs(start, middle)
    }

    return bs(middle, end)
  }

  return bs(0, Math.max(1, x))
}
