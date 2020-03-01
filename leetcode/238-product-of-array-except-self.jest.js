// [https://leetcode.com/problems/product-of-array-except-self]

test('solve', () => {
  expect(solve([1, 2, 3, 4, 5])).toEqual([120, 60, 40, 30, 24])
})

const solve = (xs) => {
  const len = xs.length

  const ltr = new Array(len).fill(1)
  const rtl = new Array(len).fill(1)

  for (let i = 1; i < len; i++) {
    ltr[i] = ltr[i - 1] * xs[i - 1]
  }

  for (let i = len - 2; i >= 0; i--) {
    rtl[i] = rtl[i + 1] * xs[i + 1]
  }

  return ltr.map((l, idx) => l * rtl[idx])
}
