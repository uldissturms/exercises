// [https://leetcode.com/problems/minimum-window-substring]

test('solve', () => {
  expect(solve('A', '')).toEqual('')
  expect(solve('', 'A')).toEqual('')
  expect(solve('', '')).toEqual('')
  expect(solve('A', 'A')).toEqual('A')
  expect(solve('A', 'AA')).toEqual('A')
  expect(solve('AA', 'AA')).toEqual('AA')
  expect(solve('AB', 'AB')).toEqual('AB')
  expect(solve('ABC', 'ADOBECODEBANC')).toEqual('BANC')
  expect(solve('AAB', 'ABA')).toEqual('ABA')
  expect(solve('AAB', 'AAB')).toEqual('AAB')
  expect(solve('AAB', 'AABA')).toEqual('AAB')
})

const solve = (cs, xs) => {
  const cL = cs.length
  const xL = xs.length

  if (xL === 0 || cL === 0) {
    return ''
  }

  const toCounts = (cs) => {
    const m = new Map()
    for (const c of cs) {
      m.set(c, (m.get(c) || 0) + 1)
    }
    return m
  }

  const o = toCounts(cs)
  const c = new Map()

  const rL = o.size
  let fL = 0

  let bI = 0

  let resL = Infinity
  let rS = 0
  let rE = 0

  for (let i = 0; i < xs.length; i++) {
    const x = xs[i]

    if (o.has(x)) {
      const v = (c.get(x) || 0) + 1
      c.set(x, v)
      if (v === o.get(x)) {
        fL++
      }
    }

    while (fL === rL) {
      const cL = i - bI + 1

      if (cL < resL) {
        resL = cL
        rS = bI
        rE = i + 1
      }

      const b = xs[bI]

      if (c.has(b)) {
        const v = c.get(b) - 1
        c.set(b, v)
        if (v < o.get(b)) {
          fL--
        }
      }

      bI++
    }
  }

  return xs.substring(rS, rE)
}
