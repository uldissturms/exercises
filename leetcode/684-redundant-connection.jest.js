// [https://leetcode.com/problems/redundant-connection]

test('solve', () => {
  expect(solve([[1, 2], [1, 3], [2, 3]])).toEqual([2, 3])
  expect(solve([[1, 2], [2, 3], [3, 4], [1, 4], [1, 5]])).toEqual([1, 4])
})

const solveR = (xs) => {
  const g = new Map()

  const dfs = (u, v, s) => {
    if (s.has(u)) {
      return false
    }

    s.add(u)

    if (u === v) {
      return true
    }

    return Array.from(g.get(u) || []).some(x => dfs(x, v, s))
  }

  for (const [u, v] of xs) {
    const s = new Set()

    if (g.has(u) && g.has(v) && dfs(u, v, s)) {
      return [u, v]
    }

    s.add(u)
    s.add(v)

    uS = g.get(u) || new Set()
    uS.add(v)

    vS = g.get(v) || new Set()
    vS.add(u)

    g.set(u, uS)
    g.set(v, vS)
  }
}

const solveDSU = (xs) => {
  const dsu = (n) => {
    const parents = new Array(n + 1).fill(0).map((_, i) => i)
    const ranks = new Array(n + 1).fill(0)

    const find = x => {
      while (parents[x] !== x) {
        const n = parents[x]
        parents[x] = parents[n]
        x = n
      }
      return x
    }

    const union = (x, y) => {
      let xr = find(x)
      let yr = find(y)

      if (xr === yr) {
        return false
      }

      if (ranks[yr] > ranks[xr]) {
        xr, yr = yr, xr
      }

      parents[yr] = xr

      if (ranks[xr] === ranks[yr]) {
        ranks[xr] = ranks[xr] + 1
      }

      return true
    }

    return {
      union
    }
  }
  const { union } = dsu(xs.length)

  for (const [u, v] of xs) {
    if (!union(u, v)) {
      return [u, v]
    }
  }

  return []
}

const solve = solveDSU
