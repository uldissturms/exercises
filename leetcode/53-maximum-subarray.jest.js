// [https://leetcode.com/problems/maximum-subarray]

test('solve', () => {
  expect(solve([])).toEqual(-Infinity)
  expect(solve([0])).toEqual(0)
  expect(solve([1])).toEqual(1)
  expect(solve([1, 2])).toEqual(3)
  expect(solve([2, -1, 2])).toEqual(3)
  expect(solve([2, -4, 3])).toEqual(3)
  expect(solve([-2, 1, -3, 4, -1, 2, 1, -5, 4])).toEqual(6)
})

test('solve - reduce', () => {
  expect(solveReduce([])).toEqual(-Infinity)
  expect(solveReduce([0])).toEqual(0)
  expect(solveReduce([1])).toEqual(1)
  expect(solveReduce([1, 2])).toEqual(3)
  expect(solveReduce([2, -1, 2])).toEqual(3)
  expect(solveReduce([2, -4, 3])).toEqual(3)
  expect(solveReduce([-2, 1, -3, 4, -1, 2, 1, -5, 4])).toEqual(6)
})

const solve = (xs) => {
  let max = -Infinity
  let cur = max

  for (const x of xs) {
    cur = Math.max(x, cur + x)
    if (cur > max) {
      max = cur
    }
  }

  return max
}

const solveReduce = xs => {
  let cm = -Infinity
  return xs.reduce((acc, cur) => {
    cm = Math.max(cm + cur, cur)
    return Math.max(acc, cm)
  }, cm)
}
