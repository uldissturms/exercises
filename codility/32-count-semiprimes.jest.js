// result: https://app.codility.com/demo/results/trainingJEBZDD-9UQ/

test('solve', () => {
  // min range
  expect(solve(1, [1], [1])).toEqual([0])

  // simple
  expect(solve(4, [1], [4])).toEqual([1])
  expect(solve(5, [1], [5])).toEqual([1])
  expect(solve(5, [1, 1, 1, 1, 1], [1, 2, 3, 4, 5])).toEqual([0, 0, 0, 1, 1])
  expect(solve(6, [1], [6])).toEqual([2])

  // example
  expect(solve(26, [1, 4, 16], [26, 10, 20])).toEqual([10, 4, 0])

  // large input
  expect(solve(50000, [1], [30000])).toEqual([7461])
})

// https://oeis.org/A001358
test('solve - semiprimes', () => {
  expect(semiPrimesFor(187)).toEqual([
    4,
    6,
    9,
    10,
    14,
    15,
    21,
    22,
    25,
    26,
    33,
    34,
    35,
    38,
    39,
    46,
    49,
    51,
    55,
    57,
    58,
    62,
    65,
    69,
    74,
    77,
    82,
    85,
    86,
    87,
    91,
    93,
    94,
    95,
    106,
    111,
    115,
    118,
    119,
    121,
    122,
    123,
    129,
    133,
    134,
    141,
    142,
    143,
    145,
    146,
    155,
    158,
    159,
    161,
    166,
    169,
    177,
    178,
    183,
    185,
    187
  ])
})

const NON_PRIME_MARKER = -1

const semiPrimesFor = n => {
  const root = Math.floor(Math.sqrt(n))

  const sieve = new Array(n + 1).fill(undefined)

  const addToSet = (x, s) => {
    s.add(x)
    if (sieve[x] != null) {
      s.add(NON_PRIME_MARKER)
    }
  }

  const updateSieve = (i) => {
    for (let j = i * 2; j <= n; j += i) {
      const s = sieve[j] || new Set()
      addToSet(i, s)
      addToSet(j / i, s)
      sieve[j] = s
    }
  }

  for (let i = 2; i <= root; i++) {
    updateSieve(i)
  }

  return sieve
    .map((x, i) => [i, x])
    .filter(([i, x]) => x && !x.has(NON_PRIME_MARKER) && x.size <= 2)
    .map(([i]) => i)
}

const solve = (n, ps, qs) => {
  const semis = semiPrimesFor(n)

  const buildPrefixList = (n, xs) => {
    const idx = new Array(n + 1).fill(0)
    let soFar = 0
    for (let i = 0; i < idx.length; i++) {
      if (xs.has(i)) {
        soFar++
      }
      idx[i] = soFar
    }
    return idx
  }

  const pl = buildPrefixList(n, new Set(semis))

  const semiPrimesIn = (s, e) => {
    return pl[e] - pl[s - 1]
  }

  return ps.map((p, i) => semiPrimesIn(p, qs[i]))
}
