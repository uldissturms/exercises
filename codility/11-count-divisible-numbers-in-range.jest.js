/*
edge cases:
1. a = b
2. a min, b min (0)
3. a min (0), b max values
4. a, b are max values (2,000,000,000)
5. k max value (2,000,000,000)
5. no divisible values in range
*/

/*
manually:

6..11 with 2

6 / 2 = 3
11 / 2 = 5

3 - 5 -> 2
6 % 2 === 0 -> 3

0..31 with 5

31 / 5 -> 6
0 % 5 -> 7

*/

/*
intuition:

calculate how many products in a and b
substract to get how many products in range
increment number of products by one if start is divisible by k

*/

/*
solve:
1. products in b - products in a
2. increment product by 1 if a divisible by k
*/

const max = 2000000000

test('solve', () => {
  // problem
  expect(solve(6, 11, 2)).toBe(3)

  // start
  expect(solve(2, 3, 2)).toBe(1)

  // end
  expect(solve(2, 3, 3)).toBe(1)

  // middle
  expect(solve(2, 4, 3)).toBe(1)

  // edge cases
  expect(solve(0, 0, 1)).toBe(1)
  expect(solve(2, 2, 2)).toBe(1)
  expect(solve(0, max, 1)).toEqual(max + 1)
  expect(solve(0, max, 2)).toEqual((max / 2) + 1)
  expect(solve(max, max, 1)).toEqual(1)
})

const isDivisible = (x, y) => x % y === 0

const solve = (a, b, k) => {
  if (a === b) {
    return isDivisible(a, k) ? 1 : 0
  }

  const divisionsA = Math.floor(a / k)
  const divisionsB = Math.floor(b / k)
  const divisionsInRange = divisionsB - divisionsA
  const divisionsAtStart = isDivisible(a, k) ? 1 : 0

  return divisionsInRange + divisionsAtStart
}
