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

const solve = xs => {
  const len = xs.length
  if (len <= L) {
    return []
  }

  const base = 4
  const baseL = Math.pow(base, L)

  const ns = xs.split('').map(x => ints[x])

  let hash = 0
  const seen = new Set()
  const res = new Set()

  // build rolling hash
  for (let i = 0; i < L; i++) {
    hash = hash * base + ns[i]
  }

  seen.add(hash)

  for (let i = 1; i <= len - L; i++) {
    // update rolling hash
    hash = hash * base - ns[i - 1] * baseL + ns[i + L - 1]
    if (seen.has(hash)) {
      res.add(xs.substring(i, i + L))
    }
    seen.add(hash)
  }

  return [...res]
}
