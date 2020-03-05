/*

reasoning:

in scenarios where all numbers are positive slices of size 2 will be the result
is there a case when it's not? - yes a negative number - the more than smaller

N = [2..100,000]
A = [-10,000..10,000]

*/

/*
manually:

[4, 2, 2, 5, 1, 5, 8]
[4, 2, -10, 5, -20, 5, 8]

[-10, -20, -50, -70] - min (-50, -70)

-25 / 3 = -8.x



at each step we can decide to keep adding a number or start a new range

0. -> 4 / 1 or 4 / 1 -> 4 (start)
1. -> (4 * 1 + 2) / 2 or 2 -> 3 or 2 -> 2 (start)
2. -> (2 * 1 + 2) / 2 -> 2 (cont)

2 algos -
1. find min two sum
2. go through and find min average over x items > 2
*/

/*
steps:
1. solve for 2 or 3 items
*/

test('solve', () => {
  expect(solve([4, 2, 2, 5, 1, 5, 8])).toEqual(1)

  // single negative number
  expect(solve([4, 2, 2, -10, 1, 5, 8])).toEqual(3)

  // all negative numbers
  expect(solve([-10, -20, -30, -4])).toEqual(1)

  // best solution is more than 2 numbers
  expect(solve([4, 2, -10, 5, -20, 5, 8])).toEqual(2)
})

// max values
test('solve - max values', () => {
  const maxN = 100000
  const minA = -10000
  const maxA = -minA
  const largeArray = [
    ...new Array(maxN / 2).fill(0).map((x, idx) => Math.max(minA, -idx)),
    ...new Array(maxN / 2).fill(0).map((x, idx) => Math.min(maxA, idx)),
  ]
  expect(solve(largeArray)).toBe(maxA)
})

const solve = (xs) => {

  let minAvg = Infinity
  let minIndex = 0

  for (let i = 0; i < xs.length - 1; i++) {
    const twoSumAvg = (xs[i] + xs[i + 1]) / 2
    const threeSumAvg = i < xs.length - 2 ? (xs[i] + xs[i + 1] + xs[i + 2]) / 3 : twoSumAvg
    const curAvg = Math.min(twoSumAvg, threeSumAvg)
    if (curAvg < minAvg) {
      minAvg = curAvg
      minIndex = i
    }
  }

  return minIndex
}
