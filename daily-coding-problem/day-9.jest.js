/*

[2, 4, 6, 2, 5] -> 13 (even indices) -> [2, 6, 5]

[5, 1, 1, 5] -> 10 (a mix) - [5, 5]

[1] -> 1
[0] -> 0
[-1] -> 0
[0, -1] -> 0
[0, -1, -2] -> 0

*/

/*
manually:

    v, 2, 4, 6, 2, 5
    i, 0, 1, 2, 3, 4
lo  0, 0, 0, 4, 4, 6
le  0  0, 2, 2, 8, 8
od  0  0, 4, 4, 6, 6
ev  0  2, 2, 8, 8, 13

max = Math.max(lastEven, lastOdd, x, lastEven + x, lastOdd + x)

if (even) {
  even = ...
  update last odd
} {
  odd = ...
  update last even
}

return Math.max(even, odd)

*/

/*
solve:
1. init last even / odd and even / odd values to 0
2. for each index
    update even and last odd for even indices
    update odd and last even for odd indices
3. return max of even and odd
*/

test('solve', () => {
  expect(solve([2, 4, 6, 2, 5])).toEqual(13)
  expect(solve([5, 1, 1, 5])).toEqual(10)
  expect(solve([1])).toEqual(1)
  expect(solve([0])).toEqual(0)
  expect(solve([-1])).toEqual(0)
  expect(solve([0, -1])).toEqual(0)
  expect(solve([0, -1, -2])).toEqual(0)
  expect(solve([5, 1, 1, -5])).toEqual(6)
})

const isEven = (x) => x % 2 === 0

const solve = (xs) => {
  let lastEven = 0
  let lastOdd = 0
  let even = 0
  let odd = 0

  for (let i = 0; i < xs.length; i++) {
    const x = xs[i]
    const max = Math.max(lastEven, lastOdd, x, lastEven + x, lastOdd + x)
    if (isEven(i)) {
      even = max
      lastOdd = odd
    } else {
      odd = max
      lastEven = even
    }
  }

  return Math.max(even, odd)
}
