/*
 *
manually:

0  1   2  3  4
[0, 1, 0, 1, 1]

count 1s

0  3  2  2  1

any pair of 0 and 1

0, 1
0, 3
0, 4
2, 3
2, 4

*/

const maxPassing = 1000000000
const maxArray = 1000000

test('solve', () => {
  // normal
  expect(solve([0])).toBe(0)
  expect(solve([1])).toBe(0)
  expect(solve([0, 1])).toBe(1)
  expect(solve([0, 1, 0])).toBe(1)
  expect(solve([0, 1, 1])).toBe(2)

  // test
  expect(solve([0, 1, 0, 1, 1])).toBe(5)
})

// max values
test('solve - max values', () => {
  // too many -> -1
  const mixOf0and1 = new Array(maxArray).fill(0).map((x, idx) => idx % 2 === 0 ? 0 : 1)
  expect(solve(mixOf0and1)).toEqual(-1)
})

const solve = (xs) => {
  const oneCounts = new Array(xs.length).fill(0)
  for (let i = xs.length - 1; i >= 0; i--) {
    oneCounts[i] = (oneCounts[i + 1] || 0) + xs[i]
  }

  let sum = 0

  for (let i = 0; i < xs.length; i++) {
    if (xs[i] === 0) {
      sum += oneCounts[i]
    }
  }

  return sum > maxPassing ? -1 : sum
}
