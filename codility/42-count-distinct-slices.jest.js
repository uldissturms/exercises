// [https://app.codility.com/demo/results/trainingFBN44F-SKN]

const maxNum = 100000

test('solve', () => {
  // empty
  expect(solve([])).toEqual(0)

  // single item
  expect(solve([1])).toEqual(1)

  // two items
  expect(solve([1, 2])).toEqual(3)
  expect(solve([1, 1])).toEqual(2)

  expect(solve([3, 4, 5, 5, 2])).toEqual(9)

  expect(solve([1, 2, 2, 1])).toEqual(6)
  expect(solve([1, 2, 2, 3])).toEqual(6)

  expect(solve([3, 1, 2, 2, 1])).toEqual(9)
  expect(solve([3, 1, 2, 1])).toEqual(8)

  // edge cases
  const uniqueArray = n => new Array(n).fill(0).map((_, i) => i)
  const sameArray = n => new Array(n).fill(0)

  expect(solve(uniqueArray(5))).toEqual(combinationsFor(5))
  expect(solve(sameArray(5))).toEqual(5)
  expect(solve([3, 4, 5, 5, 2])).toEqual(9)

  // large
  expect(solve(uniqueArray(100000))).toEqual(1000000000)
  expect(solve(sameArray(maxNum))).toEqual(maxNum)
})

const combinationsFor = n => (n * (n + 1)) / 2

const MAX_VALUE = 1000000000

const solve = xs => {
  let len = xs.length
  let count = 0
  const s = new Set()

  let fI = 0
  let bI = 0

  while (fI < len && bI < len) {
    while (fI < len && !s.has(xs[fI])) {
      count += fI - bI + 1
      s.add(xs[fI])
      fI++
    }

    while (fI < len && bI < len && s.has(xs[fI])) {
      s.delete(xs[bI])
      bI++
    }
  }

  return Math.min(MAX_VALUE, count)
}
