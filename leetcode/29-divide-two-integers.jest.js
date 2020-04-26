// [https://leetcode.com/problems/divide-two-integers]

test('solve', () => {
  expect(solve(10, 3)).toEqual(3)
  expect(solve(10, 2)).toEqual(5)
  expect(solve(10, 5)).toEqual(2)
  expect(solve(2147483647, 3)).toEqual(715827882)
  expect(solve(1, 1000)).toEqual(0)
  expect(solve(10000, 1000)).toEqual(10)
  expect(solve(100000, 1000)).toEqual(100)
  expect(solve(1000000000, 1000)).toEqual(1000000)

  // edge cases
  expect(solve(2147483647, 1)).toEqual(Math.pow(2, 31) - 1)
  expect(solve(-2147483648, 1)).toEqual(-Math.pow(2, 31))
  expect(solve(-2147483648, -1)).toEqual(Math.pow(2, 31) - 1)
  expect(solve(0, 1)).toEqual(0)
})

const max = 2147483647
const min = -2147483648

const solve = (x, y) => {
  if (x === min && y === 1) {
    return min
  }

  if (x === min && y === -1) {
    return max
  }

  if (x <= 0 && y < 0) {
    return diff(-x, -y, true)
  }

  if (x >= 0 && y > 0) {
    return diff(x, y, true)
  }

  return -diff(Math.abs(x), Math.abs(y), false)
}


const diff = (x, y, p) => {
  let q = 0

  while (x > y) {
    let times = 0
    let yt = y << 1 // start at y * 2
    let b = 0

    while (x >= yt && yt > 0) {
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

  if (x >= y) { // max 1 time as we already compared with y * 2
    x -= y
    q += 1
  }

  return Math.min(q, max)
}
