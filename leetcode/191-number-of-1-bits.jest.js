// [https://leetcode.com/problems/number-of-1-bits]

test('solve', () => {
  expect(solve(0)).toEqual(0)
  expect(solve(1)).toEqual(1)
  expect(solve(2)).toEqual(1)
  expect(solve(3)).toEqual(2)
  expect(solve(5)).toEqual(2)
})

const solve = x =>
  x
    .toString('2')
    .split('')
    .filter(x => x === '1').length
