// [https://leetcode.com/problems/is-graph-bipartite]

test('solve', () => {
  expect(solve([])).toEqual(true)
  expect(solve([[]])).toEqual(true)
  expect(solve([[1, 3], [0, 2], [1, 3], [0, 2]])).toEqual(true)
  expect(solve([[[4], [2, 3], [1], [3], [0]]])).toEqual(true)

  expect(solve([[1, 2, 3], [0, 2], [0, 1, 3], [0, 2]])).toEqual(false)
})

const solve = xs => {
  if (xs.length < 2) {
    return true
  }

  const a = new Set()
  const b = new Set()

  const [fst] = xs

  a.add(0)
  b.add(fst[0])

  const opposite = x => (x === a ? b : a)

  const expand = (i, fs) => {
    if (seen.has(i)) {
      return true
    }

    seen.add(i)

    const ts = opposite(fs)

    const es = xs[i]

    for (const e of es) {
      if (fs.has(e)) {
        return false
      }

      ts.add(e)

      if (!expand(e, ts)) {
        return false
      }
    }

    return true
  }

  const seen = new Set()

  for (let i = 0; i < xs.length; i++) {
    const fs = a.has(i) ? a : b
    if (!expand(i, fs)) {
      return false
    }
  }

  return true
}
