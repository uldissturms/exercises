/*
steps:
1. init default range
2. fill ranges for each index
3. define query solver
4. return a map of query results for each p and q pair
*/

/*
edge cases:
1. 0 queries -> emtpy array
2. n is max range
3. m is max range
4. n and m is max range
*/

/*
manually:

[4, 3, 2, 1, 4]

0 -> {
  1: 0,
  2: 0,
  3: 0,
  4: 1,
}
1 -> {
  1: 0,
  2: 0,
  3: 1,
  4: 1,
}
2 -> {
  1: 0,
  2: 1,
  3: 1,
  4: 1,
}
3 -> {
  1: 1,
  2: 1,
  3: 1,
  4: 1,
}

...

*/

test('solve', () => {
  expect(solve('TGCA', [0, 0, 0, 0], [0, 1, 2, 3])).toEqual([4, 3, 2, 1])
  expect(solve('ACGT', [0, 0, 0, 0], [0, 1, 2, 3])).toEqual([1, 1, 1, 1])

  // edge cases
  expect(solve('A', [0], [0])).toEqual([1])
  expect(solve('A', [], [])).toEqual([])
})

test('solve - time', () => {
  const maxN = 1000000
  const maxS = new Array(maxN).fill('A').join('')
  const maxM = 50000

  expect(solve(maxS, [0], [0])).toEqual([1])
  expect(solve(maxS, [0], [maxN - 1])).toEqual([1])
})

const factorMap = {
  A: 1,
  C: 2,
  G: 3,
  T: 4
}

const keyFor = (from, to) => `${from}_${to}`

const solve = (s, ps, qs) => {
  const ranges = new Array(s.length).fill(undefined)

  const init = Object.values(factorMap).reduce((acc, cur) => ({...acc, [cur]: 0 }), {})

  for (let i = 0; i < s.length; i++) {
    const prevRange = ranges[i - 1] || init
    const curFactor = factorMap[s[i]]
    ranges[i] = {...prevRange, [curFactor]: prevRange[curFactor] + 1}
  }

  const solveQuery = (from, to) => {
    const fromFactor = factorMap[s[from]]
    const rangeFrom = ranges[from]
    const rangeTo = ranges[to]

    const factorsInRange = [
      fromFactor,
      ...Object.values(factorMap)
        .map(f => ({f, v: rangeTo[f] - rangeFrom[f]}))
        .filter(({v}) => v > 0)
        .map(({f}) => f)
    ]

    return Math.min(...factorsInRange)
  }

  return ps.map((p, pIdx) => solveQuery(p, qs[pIdx]))
}
