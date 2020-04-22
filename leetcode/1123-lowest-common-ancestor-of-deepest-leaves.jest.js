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

  // examples
  // left most node
  const lmn = {
    val: 4
  }
  const lmt = {
    val: 1,
    left: {
      val: 2,
      left: lmn
    },
    right: {
      val: 3
    }
  }
  expect(solve(lmn)).toEqual(lmn)

  // right most node
  const rmn = {
    val: 4
  }
  const rmt = {
    val: 1,
    left: {
      val: 2
    },
    right: {
      val: 3,
      right: rmn
    }
  }
  expect(solve(rmn)).toEqual(rmn)

  // left and right most nodes
  const lrmt = {
    val: 1,
    left: {
      val: 2,
      left: {
        val: 4
      },
    },
    right: {
      val: 3,
      right: {
        val: 5
      }
    }
  }
  expect(solve(lrmt)).toEqual(lrmt)
})

const dfsMax = (n, d) => {
  if (n == null) {
    return d - 1
  }

  return Math.max(dfsMax(n.left, d + 1), dfsMax(n.right, d + 1))
}

const solveSO = n => {
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

const solveO = n => {
  const height = (n) => {
    if (n == null) {
      return 0
    }

    return 1 + Math.max(height(n.left), height(n.right))
  }

  const dfs = (n) => {
    if (n == null) {
      return n
    }

    const l = height(n.left)
    const r = height(n.right)

    if (l === r) {
      return n
    }

    if (r > l) {
      return dfs(n.right)
    }

    return dfs(n.left)
  }

  return dfs(n)
}

const solve = solveO
