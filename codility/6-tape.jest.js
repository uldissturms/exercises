test('solve', () => {
  // positive only
  expect(solve([0, 0])).toBe(0)
  expect(solve([0, 1])).toBe(1)
  expect(solve([3, 1, 2, 4, 3])).toBe(1)
  // negative
  expect(solve([3, -3, 10])).toBe(4)
  expect(solve([-1, -3, -10])).toBe(6)
})


/*
cases:
positive numbers only
negative numbers only
negative numbers + positive numbers
*/

/*

manually:

[3, 1, 2, 4, 3]

ltr:  [0, 3, 4, 6, 10]
rtl:  [13, 10, 9, 7, 3]
diff: [  , 7, 5, 1, 7]

*/

const sum = (x, y) => x + y

const solve = (xs) => {
  const ltr = new Array(xs.length).fill(0)
  const rtl = new Array(xs.length).fill(0)

  for (let i = 1; i < xs.length; i++) {
    ltr[i] = [ltr[i - 1], xs[i - 1]].filter(x => x).reduce(sum, 0)
  }

  for (let i = xs.length; i >= 0; i--) {
    rtl[i] = [rtl[i + 1], xs[i]].filter(x => x).reduce(sum, 0)
  }

  let min = Infinity

  for (let i = 1; i < xs.length; i++) {
    const diff = Math.abs(ltr[i] - rtl[i])
    if (diff < min) {
      min = diff
    }
  }

  return min
}
