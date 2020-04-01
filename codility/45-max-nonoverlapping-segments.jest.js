// [https://app.codility.com/demo/results/trainingKJHA4P-XNF]

test('solve', () => {
  expect(solve([1, 3, 7, 9, 9], [5, 6, 8, 9, 10])).toEqual(3)
})

// sorted by ends
// [[1, 5], [3, 6], [7, 8], [9, 9], [9, 10]]

const solve = (as, bs) => {
  let len = as.length
  let count = 0

  let start = 0
  let i = 0

  while (i < len) {

    if (as[i] >= start) {
      start = bs[i] + 1
      count++
    }

    i++
  }

  return count
}
