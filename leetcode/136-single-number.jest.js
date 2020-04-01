test('solve', () => {
  expect(solve([2, 2, 1])).toEqual(1)
  expect(solve([4, 1, 2, 1, 2])).toEqual(4)
})

const solve = (xs) => {
  let res = 0

  for (const x of xs) {
    res ^= x
  }

  return res
}
