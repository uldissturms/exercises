//[https://leetcode.com/problems/word-search]

test('solve', () => {
  // single path
  expect(solve([['B', 'X'], ['U', 'S']], 'BUS')).toBe(true)

  // multiple paths
  expect(solve([['B', 'U'], ['U', 'S']], 'BUS')).toBe(true)

  // no paths
  expect(solve([['B', 'X'], ['U', 'S']], 'BUZ')).toBe(false)

  // not allowed to use the same cell twice
  expect(solve([['B', 'X'], ['U', 'S']], 'BUB')).toBe(false)

  // edge cases
  expect(solve([['A']], 'A')).toBe(true)
  expect(solve([['A']], 'B')).toBe(false)
  expect(solve([['A']], '')).toBe(false)
  expect(solve([[]], '')).toBe(false)
  expect(solve([], '')).toBe(false)
})

test.only('solve - large input', () => {
  const count = 20
  const array = new Array(count).fill('A')
  const word = array.join('')
  const largeArray = new Array(count).fill(array)
  expect(solve(largeArray, word)).toBe(true)
})

const findLetter = (arr, l) => {
  const res = []
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[0].length; j++) {
      const c = arr[i][j]
      if (c === l) {
        res.push([i, j])
      }
    }
  }
  return res
}

const findNeighbours = (arr, p, l) => {
  const last = p[p.length - 1]
  const [pI, pJ] = last
  const cs = [
    [pI - 1, pJ], // top
    [pI + 1, pJ], // bottom
    [pI, pJ - 1], // letf
    [pI, pJ + 1], // right
  ]
    .filter(([i, j]) => i >= 0 && j >= 0 && i < arr.length && j < arr[0].length) // valid idxes
    .filter(([i, j]) => arr[i][j] === l) // valid letter
    .filter(([i, j]) => !p.some(p => p[0] === i && p[1] === j)) // valid path
  return cs
}

const solveI = (arr, w) => {

  if (arr.length === 0 || arr[0].length === 0 || w.length === 0) {
    return false
  }

  let ps = findLetter(arr, w[0]).map(x => [x])

  for (let i = 1; i < w.length; i++) {
    const ns = ps.map(p => findNeighbours(arr, p, w[i]))

    ps = ps
      .flatMap((p, pIdx) => ns[pIdx].map(n => [...p, n]))
      .filter(p => p.length > 0)

    if (ps.length === 0) {
      return false
    }
  }

  return ps.length > 0
}

const solveR = (arr, w) => {
  if (arr.length === 0 || arr[0].length === 0 || w.length === 0) {
    return false
  }

  const candidatesFor = (i, j) => [
    [i - 1, j], // top
    [i + 1, j], // bottom
    [i, j - 1], // left
    [i, j + 1], // right
  ]

  const keyFor = (i, j) => `${i}_${j}`

  const appendKey = (key, s) => {
    return new Set([
      ...Array.from(s),
      key,
    ])
  }

  const dfs = (lIdx, i, j, s) => {
    const key = keyFor(i, j)

    // done word matching
    if (lIdx >= w.length) {
      return true
    }

    // indices out of bounds
    if (i < 0 || j < 0 || i >= arr.length || j >= arr[i].length) {
      return false
    }

    // already visited node
    if (s.has(key)) {
      return false
    }

    const l = w[lIdx]

    if (l !== arr[i][j]) {
      return false
    }

    const setWithKey = appendKey(key, s)

    for (const [cI, cJ] of candidatesFor(i, j)) {
      if (dfs(lIdx + 1, cI, cJ, setWithKey)) {
        return true
      }
    }

    return false
  }

  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      if (dfs(0, i, j, new Set())) {
        return true
      }
    }
  }

  return false
}

const solve = solveR
