test('solve', () => {
  // simple cases
  expect(solve([1])).toEqual(1)
  expect(solve([1, 2])).toEqual(3)
  expect(solve([1, 2, 3])).toEqual(6)

  // skip negatives
  expect(solve([1, 2, -3])).toEqual(3)
  expect(solve([1, -3, 2])).toEqual(2)
  expect(solve([3, 2, -6, 4, 0])).toEqual(5)

  // take negative
  expect(solve([3, 4, -6, 7])).toEqual(8)
})

const solve = (xs) => {
  if (xs.length === 0) {
    return 0
  }

  const [first] = xs

  let sum = first
  let maxSum = first
  let startIdx = 0

  for (let i = 1; i < xs.length; i++) {
    const cur = xs[i]
    sum = Math.max(sum + cur, cur)
    if (sum > maxSum) {
      maxSum = sum
    }
  }

  return maxSum
}
