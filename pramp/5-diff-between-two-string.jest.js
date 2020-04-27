test('solve', () => {
  expect(solve('ABC', 'ABC')).toEqual(['A', 'B', 'C'])
  expect(solve('ABCD', 'ABC')).toEqual(['A', 'B', 'C', '-D'])
  expect(solve('DABC', 'ABC')).toEqual(['-D', 'A', 'B', 'C'])
  expect(solve('ABCDEF', 'ABC')).toEqual(['A', 'B', 'C', '-D', '-E', '-F'])
  expect(solve('DEFABC', 'ABC')).toEqual(['-D', '-E', '-F', 'A', 'B', 'C'])
  expect(solve('ABC', 'ABCD')).toEqual(['A', 'B', 'C', '+D'])
  expect(solve('AC', 'ABC')).toEqual(['A', '+B', 'C'])
  expect(solve('ABBC', 'ABC')).toEqual(['A', 'B', '-B', 'C'])
  expect(solve('ABCDEFG', 'ABDFFGH')).toEqual([
    'A',
    'B',
    '-C',
    'D',
    '-E',
    'F',
    '+F',
    'G',
    '+H'
  ])
})

const solve = (s, t) => {
  const sL = s.length // ABCDEFG 7
  const tL = t.length // ABD FFGH 7

  const inc = ([p, csf], amount, c) => {
    return [[...p, c], csf + amount]
  }

  const m = new Map()

  const key = xs => xs.join(`_`)

  const dp = (i, j) => {
    if (i === sL) {
      return [
        t
          .slice(j)
          .split('')
          .map(x => `+${x}`)
          .reverse(),
        tL - j
      ]
    }

    if (j === tL) {
      return [
        s
          .slice(i)
          .split('')
          .map(x => `-${x}`)
          .reverse(),
        sL - i
      ]
    }

    const k = key([i, j])

    if (m.has(k)) {
      return m.get(k)
    }

    const x = s[i]
    const y = t[j]

    const opts = []

    if (x === y) {
      opts.push(inc(dp(i + 1, j + 1), 0, x))
    }

    opts.push(inc(dp(i + 1, j), 1, `-${x}`), inc(dp(i, j + 1), 1, `+${y}`))

    let minC = Infinity
    let minPath = []
    for (const [p, c] of opts) {
      if (c < minC) {
        minC = c
        minPath = p
      }
    }

    const res = [minPath, minC]
    m.set(k, res)
    return res
  }

  const [p, e] = dp(0, 0)

  return p.reverse()
}
