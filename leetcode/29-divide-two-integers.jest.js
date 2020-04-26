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
const halfMin = -1073741824 // min / 2

// O(log^2(x))
const solveBS = (x, y) => {
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

// O(logx)
const solvePow = (x, y) => {
  if (x === min && y === -1) {
    return max
  }

  let negatives = 2
  if (x >= 0) {
    negatives--
    x = -x
  }
  if (y >= 0) {
    negatives--
    y = -y
  }

  const ds = []
  const ps = []

  let pot = 1

  while (y >= x) {
    ds.push(y)
    ps.push(pot)
    if (y < halfMin) {
      break;
    }
    y += y
    pot += pot
  }

  let q = 0
  for (let i = ds.length - 1; i >= 0; i--) {
    const d = ds[i]
    if (x <= d) {
      x -= d
      q += ps[i]
    }
  }

  return negatives === 1 ? -q : q
}

// O(logx)
const solvePowConstSpace = (x, y) => {
  if (x === min && y === -1) {
    return max
  }

  let negatives = 2
  if (x >= 0) {
    negatives--
    x = -x
  }
  if (y >= 0) {
    negatives--
    y = -y
  }

  let hd = y
  let hpot = -1

  while (hd >= halfMin && x <= hd + hd) {
    hd += hd
    hpot += hpot
  }

  let q = 0
  while (x <= y) {
    if (x <= hd) {
      q += hpot
      x -= hd
    }

    hpot >>= 1
    hd >>= 1
  }

  return negatives === 1 || q === 0 ? q : -q
}

const solve = solvePowConstSpace
