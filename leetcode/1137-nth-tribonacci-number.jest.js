// [https://leetcode.com/problems/n-th-tribonacci-number]

test('solve', () => {
  expect(solve(0)).toEqual(0)
  expect(solve(1)).toEqual(1)
  expect(solve(2)).toEqual(1)
  expect(solve(3)).toEqual(2)
  expect(solve(4)).toEqual(4)
  expect(solve(5)).toEqual(7)
})

const sum = (x, y) => x + y

const solve = (N) => {
  let num = N

  let xs = [
    0,
    1,
    1,
  ]

  if (num < 3) {
    return xs[num]
  }

  num -= 3

  while (num > 0) {
    const [a, b, c] = xs
    xs = [b, c, a + b + c]
    num--
  }

  return xs.reduce(sum, 0)
};


