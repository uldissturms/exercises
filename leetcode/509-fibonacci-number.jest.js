// [https://leetcode.com/problems/fibonacci-number]

test('solve', () => {
  expect(solve(0)).toEqual(0)
  expect(solve(1)).toEqual(1)
  expect(solve(2)).toEqual(1)
  expect(solve(3)).toEqual(2)
  expect(solve(4)).toEqual(3)
  expect(solve(5)).toEqual(5)
  expect(solve(6)).toEqual(8)
})

const solve = (N) => {
  let num = N
  let a = 1,
    b = 0,
    temp

  while (num > 0) {
    temp = a
    a = a + b
    b = temp
    num--
  }

  return b
};

