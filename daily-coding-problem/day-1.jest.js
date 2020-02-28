/*
Given a list of numbers and a number k, return whether any two numbers from the list add up to k.

For example, given [10, 15, 3, 7] and k of 17, return true since 10 + 7 is 17.

Bonus: Can you do this in one pass?
*/

/*
reasoning:
looks like a 2 sum
*/

/*
steps:
1. build map of numbers with corresponding indices
2. for each number x
    check if there is a number y in set such that they make up the required sum
*/

/*
edge cases:
a sum of x * 2 and a list with only one number with value of x - false
*/

test('day1', () => {
  // true
  expect(solve([1, 2, 3], 4)).toBe(true)
  expect(solve([1, 2, 2], 4)).toBe(true)
  expect(solve([0, 0], 0)).toBe(true)

  // false
  expect(solve([], 0)).toBe(false)
  expect(solve([], 1)).toBe(false)
  expect(solve([0, 1], 0)).toBe(false)
  expect(solve([1, 2, 5], 4)).toBe(false)
  expect(solve([1, 2, 2], 5)).toBe(false)
})

const solve = (arr, x) => {
  const m = new Map()
  for (let i = 0; i < arr.length; i++) {
    const n = arr[i]

    const indices = m.has(n) ? [...m.get(n), i] : [i]
    m.set(n, indices)

    const reminder = x - n
    if (m.has(reminder) && m.get(reminder).some(x => x !== i)) {
      return true
    }
  }
  return false
}
