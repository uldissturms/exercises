// [https://leetcode.com/problems/peak-index-in-a-mountain-array]

test('solve', () => {
  expect(solve([0, 1, 0])).toEqual(1)
  expect(solve([0, 2, 1, 0])).toEqual(1)
})

const solve = A => {
  let maxI = 0
  let max = A[maxI]

  for (let i = 0; i < A.length; i++) {
    const c = A[i]

    if (c > max) {
      max = c
      maxI = i
    }
  }
  return maxI
}
