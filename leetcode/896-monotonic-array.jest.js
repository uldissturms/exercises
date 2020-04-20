// [https://leetcode.com/problems/monotonic-array]

test('solve', () => {
  expect(solve([1, 2, 2, 3])).toEqual(true)
  expect(solve([6,5,4,4])).toEqual(true)
  expect(solve([1, 3, 2])).toEqual(false)
  expect(solve([1, 2, 4, 5])).toEqual(true)
  expect(solve([1, 1, 1])).toEqual(true)
})

const solve = xs => every((x, y) => x >= y, xs) || every((x, y) => x <= y, xs)

const every = (f, xs) => {
  for (let i = 1; i < xs.length; i++) {
    if (!f(xs[i - 1], xs[i])) {
      return false
    }
  }

  return true
}
