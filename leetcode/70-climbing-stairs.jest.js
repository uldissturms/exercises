// [https://leetcode.com/problems/climbing-stairs]

test('solve', () => {
  // basic tests
  expect(solve(1, [1, 2])).toEqual(1)
  expect(solve(2, [1, 2])).toEqual(2)
  expect(solve(3, [1, 2])).toEqual(3)
  expect(solve(4, [1, 2])).toEqual(5)
})


const sum = (x, y) => x + y

const solve = (n, steps, m = new Map()) => {
  if (n < 0) {
    return 0
  }

  if (n === 0) {
    return 1
  }

  if (m.has(n)) {
    return m.get(n)
  }

  const res = steps.map(s => solve(n - s, steps, m)).reduce(sum, 0)

  m.set(n, res)

  return res
}
