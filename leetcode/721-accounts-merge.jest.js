// [https://leetcode.com/problems/accounts-merge]

test('solve', () => {
  expect(
    solve([
      ['John', 'j1_1', 'j1_2'],
      ['John', 'j2_1'],
      ['John', 'j1_1', 'j1_3'],
      ['Mary', 'm1_1']
    ])
  ).toEqual([
    ['John', 'j1_1', 'j1_2', 'j1_3'],
    ['John', 'j2_1'],
    ['Mary', 'm1_1']
  ])

  expect(
    solve([
      ['x', 'x_1', 'x_2'],
      ['x', 'x_3'],
      ['x', 'x_4'],
      ['x', 'x_5'],
      ['x', 'x_4', 'x_5'],
      ['x', 'x_3', 'x_5'],
      ['x', 'x_2', 'x_3']
    ])
  ).toEqual([['x', 'x_1', 'x_2', 'x_3', 'x_4', 'x_5']])

  expect(solve([['a', 'a_1'], ['b', 'b_1'], ['c', 'c_1']])).toEqual([
    ['a', 'a_1'],
    ['b', 'b_1'],
    ['c', 'c_1']
  ])
})

const solve = xs => {
  const djs = () => {
    const m = new Map()

    const makeSet = x => {
      const n = {
        x,
        r: 0
      }

      n.parent = n

      m.set(x, n)
    }

    const find = x => {
      if (x == null) {
        return x
      }

      if (x.parent === x) {
        return x
      }

      const r = find(x.parent)
      x.parent = r
      return r
    }

    const findByKey = x => find(m.get(x))

    const union = (x, y) => {
      let xn = findByKey(x)
      let yn = findByKey(y)

      if (xn === yn) {
        return
      }

      if (xn.r < yn.r) {
        ;[xn, yn] = [yn, xn]
      }

      yn.parent = xn

      if (xn.r === yn.r) {
        xn.r++
      }
    }

    return {
      m,
      find,
      findByKey,
      union,
      makeSet
    }
  }

  const { makeSet, union, findByKey } = djs()

  for (const [n, ...es] of xs) {
    for (const e of es) {
      if (findByKey(e) == null) {
        makeSet(e)
      }
    }
  }

  for (const [_, ...ys] of xs) {
    for (let i = 1; i < ys.length; i++) {
      const y = ys[i]
      const yp = ys[i - 1]
      union(y, yp)
    }
  }

  // root -> emails
  const res = new Map()
  // root -> name
  const rns = new Map()

  for (const [n, ...es] of xs) {
    const [e] = es
    const en = findByKey(e)

    const s = res.get(en) || new Set()
    for (const x of es) {
      s.add(x)
    }
    res.set(en, s)

    if (!rns.has(en)) {
      rns.set(en, n)
    }
  }

  return Array.from(rns.entries()).map(([k, n]) => [
    n,
    ...Array.from(res.get(k)).sort()
  ])
}
