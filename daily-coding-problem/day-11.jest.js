test('solve', () => {
  // basic tests
  expect(solve(1, [1, 2])).toEqual(1)
  expect(solve(2, [1, 2])).toEqual(2)
  expect(solve(3, [1, 2])).toEqual(3)
  expect(solve(4, [1, 2])).toEqual(5)

  // custom steps
  expect(solve(4, [1, 3, 5])).toEqual(3)

  // edge cases
  expect(solve(4, [5])).toEqual(0)
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

/*

solve(1, [1, 2]) -> 1
  solve(0, [1, 2]) 1
  solve(-1, [1, 2]) 0

solve(2, [1, 2]) -> 2
  solve(1, [1, 2]) 1
  solve(0, [1, 2]) 1

*/
