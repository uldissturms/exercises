/*
steps:
1. create set
2. for each i from 1 to N
    if i does not exist in set return 0
3. return 1
*/

test('solve', () => {
  expect(solve([4, 1, 3, 2])).toEqual(1)
  expect(solve([4, 1, 3])).toEqual(0)
})

const maxN = 100000
const maxA = 1000000000

test('solve - time', () => {
  expect(solve(new Array(maxN).fill(maxA))).toEqual(0)
})

const solve = (xs) => {
  const s = new Set(xs)
  for (let i = 1; i <= xs.length; i++) {
    if (!s.has(i)) {
      return 0
    }
  }

  return 1
}
