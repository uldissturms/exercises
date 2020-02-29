/*
Given an array of integers, return a new array such that each element at index i of the
new array is the product of all the numbers in the original array except the one at i.

For example,
if our input was [1, 2, 3, 4, 5], the expected output would be [120, 60, 40, 30, 24].
If our input was [3, 2, 1], the expected output would be [2, 3, 6].
*/

/*
manual:

input:  [1,    2,  3,  4,  5]
output: [120, 60, 40, 30, 24]

ltr:    [1,   1,   2,  6, 24]
rtl:    [120, 60,  20, 5, 1 ]

one zero: [1, 0, 2, 3, 1]
          [1, 1, 0, 0, 0]
          [0, 6, 3, 1, 1]

two zeros:  [1, 0, 0, 3, 1]
            [1, 1, 0, 0, 0]
            [0, 0, 3, 1, 1]
*/

/*
reasoning: have done this problem before


edge cases:
1. 1 number eq 0 - all except one zeroes
2. 2 numbers eq 0 - all products zeroes
*/

/*
steps:
1. calculate products left to righ
2. calculate products right to left
3. multiply products at each location
*/

test('solve', () => {
  expect(solve([1, 2, 3, 4, 5])).toEqual([120, 60, 40, 30, 24])
})

const solve = (xs) => {
  const len = xs.length

  const ltr = new Array(len).fill(1)
  const rtl = new Array(len).fill(1)

  for (let i = 1; i < len; i++) {
    ltr[i] = ltr[i - 1] * xs[i - 1]
  }

  for (let i = len - 2; i >= 0; i--) {
    rtl[i] = rtl[i + 1] * xs[i + 1]
  }

  return ltr.map((l, idx) => l * rtl[idx])
}
