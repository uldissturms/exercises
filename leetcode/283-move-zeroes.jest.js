// [https://leetcode.com/problems/move-zeroes]

test('solve', () => {
  expect(solve([])).toEqual([])
  expect(solve([0])).toEqual([0])
  expect(solve([0, 0, 0])).toEqual([0, 0, 0])
  expect(solve([1])).toEqual([1])
  expect(solve([1, 1, 1])).toEqual([1, 1, 1])
  expect(solve([1, 0])).toEqual([1, 0])
  expect(solve([0, 1])).toEqual([1, 0])
  expect(solve([0, 1, 0, 3, 12])).toEqual([1, 3, 12, 0, 0])
  expect(solve([0, 0, 1, 0, 1])).toEqual([1, 1, 0, 0, 0])
  expect(solve([1, 2, 3, 0, 4, 5])).toEqual([1, 2, 3, 4, 5, 0])
})

const solve = (xs) => {
  let bI = 0

  for (let fI = 0; fI < xs.length; fI++) {
    const b = xs[bI]
    const f = xs[fI]

    if (b === 0 && f !== 0) {
      [xs[bI], xs[fI]] = [xs[fI], xs[bI]]
      bI++
    }

    if (b !== 0) {
      bI++
    }
  }

  return xs
}
