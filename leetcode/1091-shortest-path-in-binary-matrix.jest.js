// [https://leetcode.com/problems/shortest-path-in-binary-matrix]

test('solve', () => {
  expect(solve([[]])).toEqual(-1)
  expect(solve([[1]])).toEqual(-1)
  expect(solve([[1, 1]])).toEqual(-1)
  expect(solve([[0, 1]])).toEqual(-1)
  expect(solve([[1, 0]])).toEqual(-1)

  expect(solve([[0, 1], [1, 0]])).toEqual(2)
  expect(solve([[0, 0, 0], [1, 1, 0], [1, 1, 0]])).toEqual(4)
  expect(solve([[0, 0, 0]])).toEqual(3)
})

const valid = 0

const keyFor = (x, y) => `${x}_${y}`

// share an edge or corner
const childrenFor = (x, y, xs, s) =>
  [
    [x + 1, y], // top
    [x - 1, y], // bottom
    [x, y - 1], // left
    [x, y + 1], // right
    [x + 1, y - 1], // top left corner
    [x + 1, y + 1], // top right corner
    [x - 1, y - 1], // bottom left corner
    [x - 1, y + 1] // bottom right corner
  ].filter(
    ([x1, y1]) =>
      x1 >= 0 &&
      y1 >= 0 &&
      x1 < xs.length &&
      y1 < xs[x1].length &&
      xs[x1][y1] === valid &&
      !s.has(keyFor(x1, y1))
  )

const uniq = xs => {
  const s = new Set()
  const res = []

  for (const [x, y] of xs) {
    const k = keyFor(x, y)
    if (!s.has(k)) {
      res.push([x, y])
      s.add(k)
    }
  }

  return res
}
const search = (xs, sr, sc, tr, tc) => {
  if (xs.length === 0) {
    return -1
  }

  if (xs[sr][sc] !== valid || xs[tr][tc] !== valid) {
    return -1
  }

  let level = 1
  let q = [[sr, sc]]
  let c = []
  const s = new Set()

  while (q.length > 0) {
    const [x, y] = q.shift()
    const k = keyFor(x, y)

    if (x === tr && y === tc) {
      return level
    }

    if (!s.has(k)) {
      const cs = childrenFor(x, y, xs, s)
      c.push(...cs)
      s.add(k)
    }

    if (q.length === 0) {
      level++
      q = c
      c = []
    }
  }

  return -1
}

const solve = xs => search(xs, 0, 0, xs.length - 1, xs[0].length - 1)
