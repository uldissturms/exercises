// [https://leetcode.com/problems/spiral-matrix]

test('solve', () => {
  expect(solve([])).toEqual([])
  expect(solve([[1, 2, 3], [4, 5, 6], [7, 8, 9]])).toEqual([
    1,
    2,
    3,
    6,
    9,
    8,
    7,
    4,
    5
  ])
  expect(solve([1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12])).toEqual([
    1,
    2,
    3,
    4,
    8,
    12,
    11,
    10,
    9,
    5,
    6,
    7
  ])
})

const solve = xs => {
  if (xs.length === 0) {
    return []
  }

  const xsL = xs.length * xs[0].length

  let cl = xs.length - 1
  let rl = xs[0].length

  let res = []

  let d = 'T'
  let i = 0
  let j = 0
  let s = 0

  while (res.length < xsL) {
    res.push(xs[i][j])

    s++

    if (d === 'T') {
      if (s === rl) {
        s = 0
        rl--
        d = 'R'
        i++
      } else {
        j++
      }
    } else if (d === 'B') {
      if (s === rl) {
        s = 0
        rl--
        d = 'L'
        i--
      } else {
        j--
      }
    } else if (d === 'R') {
      if (s === cl) {
        s = 0
        cl--
        d = 'B'
        j--
      } else {
        i++
      }
    } else if (d === 'L') {
      if (s === cl) {
        s = 0
        cl--
        d = 'T'
        j++
      } else {
        i--
      }
    }
  }

  return res
}
