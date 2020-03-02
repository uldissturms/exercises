/*
manually

N -> 3
arr -> [1, 2, 4] (1 + 2 + 3 + 4) = 10 = (4 * 5) / 2

sum = ((N + 1) * (N + 2)) / 2

*/

test('solve', () => {
  expect(solve([1, 2, 4])).toBe(3)
  expect(solve([2, 3, 1, 5])).toBe(4)
  expect(solve([2, 3, 1, 5])).toBe(4)
  expect(solve([])).toBe(1)
})

const solve = (xs) => {
  const n = xs.length
  let sum = ((n + 1) * (n + 2)) / 2
  for (const x of xs) {
    sum -= x
  }
  return sum
}
