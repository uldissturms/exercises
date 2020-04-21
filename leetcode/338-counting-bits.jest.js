// [https://leetcode.com/problems/counting-bits/]

test('solve', () => {
  expect(solve(2)).toEqual([0, 1, 1])
  expect(solve(5)).toEqual([0, 1, 1, 2, 1, 2])
})

const solve = num => {
  const res = []
  for (let i = 0; i <= num; i++) {
    res.push(
      i
        .toString('2')
        .split('')
        .filter(x => x === '1').length
    )
  }
  return res
}
