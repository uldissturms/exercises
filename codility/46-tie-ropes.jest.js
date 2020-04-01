// [https://app.codility.com/demo/results/training447X87-D8U]

test('solve', () => {
  expect(solve(4, [1, 1, 1])).toEqual(0)
  expect(solve(4, [1, 1, 1, 1])).toEqual(1)
  expect(solve(5, [1, 1, 1, 1])).toEqual(0)
  expect(solve(1, [])).toEqual(0)
  expect(solve(1, [1])).toEqual(1)
  expect(solve(4, [10])).toEqual(1)
  expect(solve(3, [1, 2, 3, 2, 1])).toEqual(3)

  // examples
  expect(solve(4, [1, 2, 3, 4, 1, 1, 3])).toEqual(3)
  expect(solve(2, [1])).toEqual(0)
  expect(solve(2, [1, 2])).toEqual(1)
  expect(solve(3, [2, 2, 1, 2])).toEqual(2)
  expect(solve(3, [2, 2, 2, 2])).toEqual(2)
  expect(solve(3, [2, 3, 2, 2])).toEqual(2)
})

const solve = (k, xs) => {
  let len = xs.length

  let sum = 0
  let maxCount = 0

  for (let fI = 0; fI < len; fI++) {

    sum += xs[fI]

    if (sum >= k) {
      maxCount += 1
      sum = 0
    }
  }

  return maxCount
}
