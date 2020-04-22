// [https://leetcode.com/problems/shortest-path-in-binary-matrix]

test('solve', () => {
  expect(solve([[]])).toEqual(-1)
  expect(solve([[1]])).toEqual(-1)
  expect(solve([[1, 1]])).toEqual(-1)
  expect(solve([[0, 1]])).toEqual(-1)
  expect(solve([[1, 0]])).toEqual(-1)

  expect(solve([[0, 1], [1, 0]])).toEqual(2)
  expect(solve([[0,0,0],[1,1,0],[1,1,0]])).toEqual(4)
  expect(solve([[0,0,0]])).toEqual(3)
})

const valid = 0

const search = (grid, sr, sc, tr, tc) => {
  if (grid.length === 0) {
    return -1
  }

  if (grid[sr][sc] !== valid || grid[tr][tc] !== valid) {
    return -1
  }

  const gL = grid.length
  const gW = grid[0].length

  let level = 1
  let q = [[sr, sc]]
  let c = []
  const s = new Set()

  const keyFor = (x, y) => `${x}_${y}`

  // share an edge or corner
  const childrenFor = (x, y) =>
    [
      [x + 1, y], // top
      [x - 1, y], // bottom
      [x, y - 1], // left
      [x, y + 1],  // right
      [x + 1, y - 1], // top left corner
      [x + 1, y + 1], // top right corner
      [x - 1, y - 1], // bottom left corner
      [x - 1, y + 1], // bottom right corner
    ].filter(
      ([x1, y1]) =>
        x1 >= 0 &&
        y1 >= 0 &&
        x1 < gL &&
        y1 < gW &&
        !s.has(keyFor(x1, y1)) &&
        grid[x1][y1] === valid
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

  while (q.length > 0) {
    const [x, y] = q.shift()
    const k = keyFor(x, y)

    if (x === tr && y === tc) {
      return level
    }

    if (!s.has(k)) {
      const cs = childrenFor(x, y)
      c.push(...cs)
      s.add(k)
    }

    if (q.length === 0) {
      level++
      q = uniq(c)
      c = []
    }
  }

  return -1
}

const solve = xs => search(xs, 0, 0, xs.length - 1, xs[0].length - 1)
