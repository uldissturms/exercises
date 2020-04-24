// [https://leetcode.com/problems/shortest-distance-from-all-buildings]

test('solve', () => {
  expect(solve([[1, 0, 2, 0, 1], [0, 0, 0, 0, 0], [0, 0, 1, 0, 0]])).toEqual(7)

  const size = 50
  const xs = new Array(size)
    .fill(0)
    .map(() => new Array(size).fill(0).map((_, i) => (i === 0 || i === size - 1 ? 1 : 0)))
  expect(solve(xs)).toEqual(3700)
})

const EMPTY = 0
const HOUSE = 1
const OBSTACLE = 2

const houses = xs => {
  const res = []

  for (let i = 0; i < xs.length; i++) {
    for (let j = 0; j < xs[i].length; j++) {
      const x = xs[i][j]
      if (x === HOUSE) {
        res.push([i, j])
      }
    }
  }

  return res
}

const key = xs => xs.join('_')

const oneAway = ([xI, xJ], v, xs, seen) => {
  return [
    [xI - 1, xJ], // top
    [xI + 1, xJ], // bottom
    [xI, xJ - 1], // left
    [xI, xJ + 1] // right
  ].filter(
    ([cI, cJ]) =>
      cI >= 0 &&
      cJ >= 0 &&
      cI < xs.length &&
      cJ < xs[cI].length &&
      xs[cI][cJ] === v &&
      !seen.has(key([cI, cJ]))
  )
}

// bfs
const distances = (h, xs, hm) => {
  let qs = [h]
  let cs = []
  let level = 0

  const seen = new Set()

  while (qs.length > 0) {
    const c = qs.pop()
    const k = key(c)

    if (!seen.has(k)) {
      seen.add(k)
      hm.set(k, level)
      cs.push(...oneAway(c, EMPTY, xs, seen))
    }

    if (qs.length === 0) {
      qs = cs
      cs = []
      level++
    }
  }
}

const expand = (hs, xs) => {
  const m = new Map()
  for (const h of hs) {
    const hk = key(h)
    const hm = new Map()
    m.set(hk, hm)
    distances(h, xs, hm)
  }
  return m
}

const solve = xs => {
  const hs = houses(xs)
  const ds = expand(hs, xs)
  let best = Infinity

  const m = new Map()

  for (let i = 0; i < xs.length; i++) {
    for (let j = 0; j < xs[i].length; j++) {
      const x = xs[i][j]
      if (x === EMPTY) {
        const lk = key([i, j])
        let sum = 0

        for (const h of hs) {
          const hk = key(h)
          const d = (ds.get(hk) || new Map()).get(lk)
          sum += d || Infinity
          if (sum === Infinity) {
            break
          }
        }

        if (sum < best) {
          best = sum
        }
      }
    }
  }

  return best === Infinity ? -1 : best
}
