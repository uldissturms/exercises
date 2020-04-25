// [https://leetcode.com/problems/divide-two-integers]

test('solve', () => {
  expect(solve(10, 3)).toEqual(3)
  expect(solve(10, 2)).toEqual(5)
  expect(solve(10, 5)).toEqual(2)
  expect(solve(2147483647, 3)).toEqual(715827882)
})

const solve = (x, y) => {
  if (x <= 0 && y < 0) {
    return diff(-x, -y, true)
  }

  if (x >= 0 && y > 0) {
    return diff(x, y, true)
  }

  return -diff(Math.abs(x), Math.abs(y), false)
}

const max = Math.pow(2, 31) - 1
const min = Math.pow(2, 31)

const diff = (x, y, p) => {
  let q = 0

  while (x > y) {
    let times = -1
    let yt = y
    let b = 0

    while (x > yt && yt > 0) {
      b = yt
      times += 1
      yt <<= 1
    }

    if (times > 0) {
      q += Math.pow(2, times)
    }

    if (times === 0) {
      break
    }

    x -= b
  }

  while (x >= y) {
    x -= y
    q += 1
  }

  const bound = p ? max : min

  return Math.min(q, bound)
}
