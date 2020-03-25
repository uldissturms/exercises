test('solve', () => {
  expect(solve(10)).toEqual(4)
})

const solve = n => sieve(n).filter(x => x < n).length

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
