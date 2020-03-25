test('solve', () => {
  expect(solve(1, 1)).toEqual(1)
  expect(solve(2, 2)).toEqual(1)
  expect(solve(3, 3)).toEqual(1)

  expect(solve(2, 1)).toEqual(2)
  expect(solve(10, 5)).toEqual(2)
  expect(solve(10, 2)).toEqual(5)
  expect(solve(10, 4)).toEqual(5)

  expect(solve(7, 2)).toEqual(7)
  expect(solve(6, 3)).toEqual(2)

  // examples
  expect(solve(18, 4)).toEqual(9)
  expect(solve(24, 18)).toEqual(4)

  expect(solve(1000000000, 1)).toEqual(1000000000)
})

const factorize = (n) => {
  const m = new Map()
  let x = n
  const root = Math.floor(Math.sqrt(n))

  const incFactor = (x) => {
    const count = m.get(x) || 0
    m.set(x, count + 1)
  }

  for (let i = 2; i <= root; i++) {
    if (x % i === 0) {
      x = x / i
      incFactor(i)
      i--
    }
  }

  if (x !== 1) {
    incFactor(x)
  }

  return m
}

const joinWithMax = (xM, yM) =>
  Array.from(new Set([...xM.keys(), ...yM.keys()])).map(k => [
    k,
    Math.max(xM.get(k) || 0, yM.get(k) || 0)
  ])

const lcm = (cX, cY) =>
  joinWithMax(cX, cY).reduce((acc, [k, v]) => acc * Math.pow(k, v), 1)

// Optimal solution - O(log(N + M))
const solveO = (n, m) => {
  const nF = factorize(n)
  const mF = factorize(m)
  return lcm(nF, mF) / m
}

// Brute force - generate reference data for tests - O(N)
const solveBF = (n, m0) => {
  const m = m0 % n
  const s = new Set()

  let i = 0

  while (true) {
    if (s.has(i)) {
      return s.size
    }

    s.add(i)

    i = (i + m) % n
  }
}

const solve = solveO
