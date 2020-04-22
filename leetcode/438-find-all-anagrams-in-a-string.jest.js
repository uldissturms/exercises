// [https://leetcode.com/problems/find-all-anagrams-in-a-string]

test('solve', () => {
  expect(solve('', '')).toEqual([])
  expect(solve('', 'a')).toEqual([])
  expect(solve('a', '')).toEqual([])
  expect(solve('a', 'a')).toEqual([0])
  expect(solve('aa', 'a')).toEqual([0, 1])

  // examples
  expect(solve('cbaebabacd', 'abc')).toEqual([0, 6])
  expect(solve('abab', 'ab')).toEqual([0, 1, 2])
})

const solve = (xs, ps) => {

  const xL = xs.length
  const pL = ps.length

  if (xL === 0 || pL === 0 || xL < pL) {
    return []
  }

  const countsFor = (xs) => {
    const m = new Map()
    for (const x of xs) {
      m.set(x, (m.get(x) || 0) + 1)
    }
    return m
  }

  const res = []

  const cs = countsFor(ps)
  const required = cs.size

  let current = new Map()
  let formed = 0
  let bI = 0

  for (let i = 0; i < xL; i++) {
    const x = xs[i]

    if (cs.has(x)) {
      const v = (current.get(x) || 0) + 1
      current.set(x, v)
      if (v === cs.get(x)) {
        formed++
      }
    } else {
      current = new Map()
      formed = 0
      bI = i + 1
    }

    // found an anagram adv front pointer
    if (formed === required && cs.get(x) === current.get(x)) {
      res.push(bI)
    }

    while (current.has(x) && current.get(x) > cs.get(x)) {
      const b = xs[bI]

      const v = current.get(b) - 1
      current.set(b, v)

      if (cs.get(b) === v + 1) {
        formed--
      }

      // found an anagram adv back pointer
      if (cs.get(b) === v && formed === required) {
        res.push(bI + 1)
      }

      bI++
    }

  }

  return res

}
