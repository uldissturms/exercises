// [https://leetcode.com/problems/shortest-distance-from-all-buildings]

test('solve', () => {
  expect(solve([[1, 0, 2, 0, 1], [0, 0, 0, 0, 0], [0, 0, 1, 0, 0]])).toEqual(7)

  const size = 50
  const xs = new Array(size)
    .fill(0)
    .map(() =>
      new Array(size).fill(0).map((_, i) => (i === 0 || i === size - 1 ? 1 : 0))
    )
  expect(solve(xs)).toEqual(3700)
})

const houses = xs => {
  const res = []

  for (let i = 0; i < xs.length; i++) {
    for (let j = 0; j < xs[i].length; j++) {
      const x = xs[i][j]
      if (x === 1) {
        res.push([i, j])
      }
    }
  }

  return res
}

const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]]

// bfs
const distances = (h, xs, ys) => {
  let qs = [h]
  let cs = []
  let level = 0

  const n = xs.length
  const m = xs[0].length

  const seen = Array.from({ length: n }, () =>
    Array.from({ length: m }, () => false)
  )

  const valid = ([xI, xJ]) =>
    xI >= 0 &&
    xJ >= 0 &&
    xI < xs.length &&
    xJ < xs[xI].length &&
    xs[xI][xJ] === 0 &&
    !seen[xI][xJ]

  while (qs.length > 0) {
    const c = qs.pop()
    const [cI, cJ] = c

    if (!seen[cI][cJ]) {
      seen[cI][cJ] = true
      y = ys[cI][cJ]
      y.l += level
      y.c++
      for (const [dI, dJ] of directions) {
        const n = [cI + dI, cJ + dJ]
        if (valid(n)) {
          cs.push(n)
        }
      }
    }

    if (qs.length === 0) {
      qs = cs
      cs = []
      level++
    }
  }
}

const expand = (hs, xs) => {
  const n = xs.length
  const m = xs[0].length

  const ys = Array.from({ length: n }, () =>
    Array.from({ length: m }, () => ({ l: 0, c: 0 }))
  )

  for (const h of hs) {
    distances(h, xs, ys)
  }

  return ys
}

const solve = xs => {
  const hs = houses(xs)
  const hl = hs.length
  const ds = expand(hs, xs)
  let min = Infinity

  const n = xs.length
  const m = xs[0].length

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      const x = xs[i][j]
      const { l, c } = ds[i][j]
      if (x === 0 && c === hl) {
        if (l < min) {
          min = l
        }
      }
    }
  }

  return min === Infinity ? -1 : min
}
