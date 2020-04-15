test('solve', () => {
  // empty
  expect(solve('', '')).toEqual(0)
  expect(solve('a', '')).toEqual(1)
  expect(solve('', 'a')).toEqual(1)

  // single extra - end
  expect(solve('a', 'ab')).toEqual(1)
  expect(solve('ab', 'a')).toEqual(1)

  // single extra - start
  expect(solve('ab', 'b')).toEqual(1)

  // single extra - middle
  expect(solve('abc', 'ac')).toEqual(1)

  // multiple extra
  expect(solve('abc', 'aebec')).toEqual(2)

  // replace
  expect(solve('abc', 'xbc')).toEqual(1)
})

test('solve - examples', () => {
  expect(solve('horse', 'word2')).toEqual(3)
  expect(solve('intention', 'execution')).toEqual(5)
})

const solveR = (xs, ys) => {
  const xL = xs.length
  const yL = ys.length
  const m = new Map()

  const keyFor = args => args.join('_')

  const dp = (xI, yI) => {
    const k = keyFor([xI, yI])

    if (m.has(k)) {
      return m.get(k)
    }

    if (xI === xL) {
      return yL - yI
    }

    if (yI === yL) {
      return xL - xI
    }

    const rc = xs[xI] === ys[yI] ? 0 : 1

    const opts = [
      dp(xI, yI + 1) + 1, // insert
      dp(xI + 1, yI) + 1, // delete
      dp(xI + 1, yI + 1) + rc // replace
    ]

    const r = Math.min(...opts)
    m.set(k, r)
    return r
  }

  return dp(0, 0)
}

/*

  a b 0
a 1 1 1
0 2 1 0

  a b c 0
a 1 2 2 2
b 2 1 1 1
0 3 2 1 0

*/

const solveI = (xs, ys) => {
  const xL = xs.length // rows
  const yL = ys.length // columns

  if (xL === 0) {
    return yL
  }

  if (yL === 0) {
    return xL
  }

  const extra = 1
  const dp = new Array(xL + extra).fill(Infinity).map(x => new Array(yL + extra).fill(x))

  // set columns for last row
  for (let i = 0; i <= yL; i++) {
    dp[xL][i] = Math.min(dp[xL][i], yL - i)
  }

  // set rows for last column
  for (let i = 0; i <= xL; i++) {
    dp[i][yL] = Math.min(dp[i][yL], xL - i)
  }

  for (let i = xL - 1; i >= 0; i--) {
    for (let j = yL - 1; j >= 0; j--) {
      const rc = xs[i] === ys[j] ? 0 : 1
      const opts = [
        dp[i][j + 1] + 1,      // insert
        dp[i + 1][j] + 1,      // delete
        dp[i + 1][j + 1] + rc, // replace
      ]
      dp[i][j] = Math.min(...opts)
    }
  }

  return dp[0][0]

}

// https://en.wikipedia.org/wiki/Levenshtein_distance
const solveIB = (xs, ys) => {
  const xL = xs.length
  const yL = ys.length

  let v0 = new Array(yL + 1).fill(0)
  let v1 = new Array(yL + 1).fill(0)

  for (let i = 0; i <= yL; i++) {
    v0[i] = i
  }

  for (let i = 0; i < xL; i++) {
    v1[0] = i + 1
    for (let j = 0; j < yL; j++) {
      const dc = v0[j + 1] + 1
      const ic = v1[j] + 1
      const sc = xs[i] === ys[j] ? v0[j] : v0[j] + 1
      v1[j + 1] = Math.min(dc, ic, sc)
    }
    [v0, v1] = [v1, v0]
  }

  return v0[yL]
}

const solve = solveIB
