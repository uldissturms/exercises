const assert = require('assert')

test('solve', () => {
  assert.equal(solve([3, 2, 6, -1, 4, 5, -1, 2]), 17)
  assert.equal(solve([3, 2, 6]), 0)
  assert.equal(solve([10, 2, 2, 2, 2, 10]), 6)
  assert.equal(solve([10, 2, 2, 2, 1, 10]), 6)
  assert.equal(solve([10, 2, 2, 2, 2, 1]), 6)
  assert.equal(solve([10, 1, 1, 2, 2, 2]), 5)
})

const solve = (xs) => {
  const len = xs.length
  const ltr = new Array(len).fill(0)
  const rtl = new Array(len).fill(0)
  for (let i = 1; i < len - 1; i++) {
    ltr[i] = Math.max(0, ltr[i - 1] + xs[i])
  }
  for (let i = len - 2; i > 0; i--) {
    rtl[i] = Math.max(0, rtl[i + 1] + xs[i])
  }
  let max = 0
  let maxIdx = 0
  for (let i = 0; i < len - 2; i++) {
    const sum = ltr[i] + rtl[i + 2]
    if (sum > max) {
      max = sum
      maxIdx = i
    }
  }
  return max
}

