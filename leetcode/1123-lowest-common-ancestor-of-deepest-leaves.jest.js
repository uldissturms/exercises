// [https://leetcode.com/problems/lowest-common-ancestor-of-deepest-leaves]

test('solve', () => {
  const root = {
    val: 1,
    left: {
      val: 2
    },
    right: {
      val: 3
    }
  }
  expect(solve(root)).toEqual(root)
  expect(solve(undefined)).toEqual(undefined)

  const singleItem = { val: 1 }
  expect(solve(singleItem)).toEqual(singleItem)
})

const dfsMax = (n, d) => {
  if (n == null) {
    return d - 1
  }

  return Math.max(dfsMax(n.left, d + 1), dfsMax(n.right, d + 1))
}

const solve = n => {
  if (n == null) {
    return n
  }

  const md = dfsMax(n, 0)

  const dfsPaths = (n, d, ps) => {
    if (n == null) {
      return []
    }

    if (d === md) {
      return [[...ps, n]]
    }

    return [
      ...dfsPaths(n.left, d + 1, [...ps, n]),
      ...dfsPaths(n.right, d + 1, [...ps, n])
    ]
  }

  const same = (i, fst, xs) => {
    for (let j = 1; j < xs.length; j++) {
      if (xs[j][i] !== fst[i]) {
        return false
      }
    }
    return true
  }

  const ps = dfsPaths(n, 0, [])
  const [fst] = ps

  for (let i = 0; i <= md; i++) {
    if (!same(i, fst, ps)) {
      return fst[i - 1]
    }
  }

  return fst[md]
}
