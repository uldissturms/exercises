// [https://leetcode.com/problems/toeplitz-matrix]

test('solve', () => {
  expect(solve([[1, 2, 3, 4], [5, 1, 2, 3], [9, 5, 1, 2]])).toEqual(true)
  expect(solve([[1, 2], [2, 2]])).toEqual(false)
})

const solve = (arr) => {
  for (let i = 1; i < arr.length; i++) {
    const ref = arr[i - 1]
    const cur = arr[i]

    for (let j = 1; j < cur.length; j++) {
      if (cur[j] !== ref[j - 1]) {
        return false
      }
    }

  }

  return true
}
