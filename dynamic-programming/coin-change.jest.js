const coins = [1, 5, 10, 25, 50, 100]

test('solve - iteratively - determine parents at end', () => {
  expect(solveI(5, 0.99, coins)).toEqual([1, 0, 0, 0, 0, 4])
  expect(solveI(0.1, 0.02, coins)).toEqual([3, 1, 0, 0, 0, 0])
  expect(solveI(0.02, 0.01, [2])).toEqual([0])
  expect(solveI(0.05, 0.01, [3, 5])).toEqual([0, 0])
})

test('solve - iteratively - determine parents as we go', () => {
  expect(solveI2(5, 0.99, coins)).toEqual([1, 0, 0, 0, 0, 4])
  expect(solveI2(0.1, 0.02, coins)).toEqual([3, 1, 0, 0, 0, 0])
  expect(solveI2(0.02, 0.01, [2])).toEqual([0])
  expect(solveI2(0.05, 0.01, [3, 5])).toEqual([0, 0])
})

test('solve - recursively', () => {
  expect(solveR(5, 0.99, coins)).toEqual([1, 0, 0, 0, 0, 4])
  expect(solveR(0.1, 0.02, coins)).toEqual([3, 1, 0, 0, 0, 0])
  expect(solveR(0.02, 0.01, [2])).toEqual([0])
  expect(solveR(0.05, 0.01, [3, 5])).toEqual([0, 0])
})

const changeFor = (m, p) => Math.trunc(m * 100 - p * 100)

const buildTable = (c, coins) => {
  let dp = new Array(c + 1).fill(Infinity)

  dp[0] = 0

  const dps = []

  for (const coin of coins) {
    dp = [...dp]
    for (let i = coin; i <= c; i++) {
      dp[i] = Math.min(dp[i], dp[i - coin] + 1)
    }
    dps.push(dp)
  }

  return dps
}

const trackParents = (c, dps, coins) => {
  const res = new Array(coins.length).fill(0)

  const findMin = i => {
    let minI = undefined
    let minV = Infinity

    for (let j = 0; j < dps.length; j++) {
      const cur = dps[j][i]
      if (cur < minV) {
        minI = j
        minV = cur
      }
    }

    return minI
  }

  let i = c

  while (i > 0) {
    const mI = findMin(i)

    if (mI == null) {
      return res
    }

    res[mI] = res[mI] + 1
    i -= coins[mI]
  }

  return res
}

const mapResult = ({ coins, path }, e) => {
  if (coins === Infinity) {
    return e
  }

  return path
}

const solveI = (m, p, coins) => {
  const c = changeFor(m, p)
  return trackParents(c, buildTable(c, coins), coins)
}

const clone = x => JSON.parse(JSON.stringify(x))

const incArray = (i, xs) => {
  const ys = [...xs]
  ys[i] = (ys[i] || 0) + 1
  return ys
}

const addCoin = (i, { coins, path }) => ({
  coins: coins + 1,
  path: incArray(i, path)
})

const buildTableWithParents = (e, c, coins) => {
  let dp = new Array(c + 1)
    .fill(0)
    .map(x => ({ coins: Infinity, path: [...e] }))

  dp[0] = { coins: 0, path: e }

  for (let i = 0; i < coins.length; i++) {
    const coin = coins[i]
    for (let j = coin; j <= c; j++) {
      if (dp[j].coins > dp[j - coin].coins + 1) {
        dp[j] = addCoin(i, dp[j - coin])
      }
    }
  }

  return dp
}

const findMin = (e, c, dps) => {
  let min = e
  let minV = Infinity

  for (const { coins, path } of dps) {
    if (coins < minV) {
      min = path
      minV = coins
    }
  }

  return min
}

const solveI2 = (m, p, coins) => {
  const c = changeFor(m, p)
  const e = new Array(coins.length).fill(0)
  const dp = buildTableWithParents(e, c, coins)
  return mapResult(dp[c]) || e
}

const solveR = (a, p, coins) => {
  const c = changeFor(a, p)
  const m = new Map()
  const e = new Array(coins.length).fill(0)

  const minOf = xs => {
    let min = { coins: Infinity, path: [] }

    for (let x of xs) {
      if (x.coins < min.coins) {
        min = x
      }
    }

    return min
  }

  const dp = x => {
    if (m.has(x)) {
      return m.get(x)
    }

    if (x === 0) {
      return { coins: 0, path: e }
    }

    const opts = []

    for (let i = 0; i < coins.length; i++) {
      const coin = coins[i]
      if (x - coin >= 0) {
        const res = dp(x - coin)
        if (res.coins < Infinity) {
          opts.push(addCoin(i, res))
        }
      }
    }

    const res = minOf(opts)

    m.set(x, res)

    return res
  }

  return mapResult(dp(c), e)
}
