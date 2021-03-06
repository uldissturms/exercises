// [https://leetcode.com/problems/repeated-dna-sequences]
// [https://leetcode.com/articles/repeated-dna-sequences]

test('solve', () => {
  expect(solve('AAAAACCCCCAAAAACCCCCCAAAAAGGGTTT')).toEqual([
    'AAAAACCCCC',
    'CCCCCAAAAA'
  ])
  expect(solve('AAAAAAAAAAA')).toEqual(['AAAAAAAAAA'])
})

const L = 10

const ints = {
  A: 0,
  C: 1,
  G: 2,
  T: 3
}

const solveRK = xs => {
  const len = xs.length
  if (len <= L) {
    return []
  }

  const base = 4
  const baseL = Math.pow(base, L)

  let hash = 0
  const seen = new Set()
  const res = new Set()

  // build rolling hash
  for (let i = 0; i < L; i++) {
    hash = hash * base + ints[xs[i]]
  }

  seen.add(hash)

  for (let i = 1; i <= len - L; i++) {
    // update rolling hash
    hash = hash * base - ints[xs[i - 1]] * baseL + ints[xs[i + L - 1]]
    if (seen.has(hash)) {
      res.add(xs.substring(i, i + L))
    }
    seen.add(hash)
  }

  return [...res]
}

const solveBM = xs => {
  const len = xs.length
  if (len <= L) {
    return []
  }

  let bitmask = 0
  const seen = new Set()
  const res = new Set()

  // build rolling hash
  for (let i = 0; i < L; i++) {
    bitmask <<= 2
    bitmask |= ints[xs[i]]
  }

  seen.add(bitmask)

  for (let i = 1; i <= len - L; i++) {
    // update rolling hash
    bitmask <<= 2
    bitmask |= ints[xs[i + L - 1]]
    bitmask &= ~(3 << 2 * L)
    if (seen.has(bitmask)) {
      res.add(xs.substring(i, i + L))
    }
    seen.add(bitmask)
  }

  return [...res]
}

const solve = solveBM
