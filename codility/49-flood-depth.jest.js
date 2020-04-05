// [https://app.codility.com/demo/results/training9TYKFE-72N]

test('solve', () => {
  expect(solve([1, 3, 2, 1, 2, 1, 5, 3, 3, 4, 2])).toEqual(2)
  expect(solve([5, 8])).toEqual(0)
})

const solve = (xs) => {
  const len = xs.length
  const ltr = new Array(len).fill(0)
  const rtl = new Array(len).fill(0)

  for (let i = 0; i < len; i++) {
    ltr[i] = Math.max(ltr[i - 1] || 0, xs[i])
  }

  for (let i = len - 1; i >= 0; i--) {
    rtl[i] = Math.max(rtl[i + 1] || 0, xs[i])
  }

  let max = 0

  for (let i = 1; i < len - 1; i++) {
    const x = xs[i]
    const b = ltr[i - 1]
    const f = rtl[i + 1]

    const d = Math.min(b, f) - x

    max = Math.max(d, max)
  }

  return max
}
