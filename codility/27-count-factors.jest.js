test('solve', () => {
  expect(solve(1)).toEqual(1)
  expect(solve(2)).toEqual(2)
  expect(solve(3)).toEqual(2)
  expect(solve(4)).toEqual(3)
  expect(solve(6)).toEqual(4)
  expect(solve(24)).toEqual(8)
  expect(solve(42)).toEqual(8)

  // primes
  expect(solve(41)).toEqual(2)

  // larger numbers
  expect(solve(69)).toEqual(4)
  expect(solve(120)).toEqual(16)
})

test('solve - max value', () => {
  expect(solve(97093212)).toEqual(96)
  expect(solve(2147483647)).toEqual(2)
  expect(solve(Math.pow(2, 31))).toEqual(32)
})

const solve = x => {
  let factors = 0
  let root = Math.floor(Math.sqrt(x))

  if (Math.pow(root, 2) === x) {
    factors++
  } else {
    root++
  }

  for (let i = 1; i < root; i++) {
    if (x % i === 0) {
      factors += 2
    }
  }

  return factors
}

test.skip('solve - sieve', () => {
  expect(sieve(2)).toEqual([2])
  expect(sieve(3)).toEqual([2, 3])
  expect(sieve(5)).toEqual([2, 3, 5])
  expect(sieve(6)).toEqual([2, 3, 5])
  expect(sieve(7)).toEqual([2, 3, 5, 7])
})

const sieve = x => {
  const root = Math.floor(Math.sqrt(x))
  const flags = new Array(x + 1).fill(true)

  flags[0] = false
  flags[1] = false

  for (let i = 2; i <= root; i++) {
    if (flags[i] === true) {
      for (let j = i * i; j <= x; j = j + i) {
        flags[j] = false
      }
    }
  }

  return flags
    .map((f, fIdx) => [f, fIdx])
    .filter(([f]) => f === true)
    .map(([f, fIdx]) => fIdx)
}
