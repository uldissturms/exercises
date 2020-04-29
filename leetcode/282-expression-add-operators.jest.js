// [https://leetcode.com/problems/expression-add-operators]

test('solve', () => {
  expect(solve('123', 6).sort()).toEqual(['1*2*3', '1+2+3'])
  expect(solve('10', 10).sort()).toEqual(['10'])
  expect(solve('105', 5).sort()).toEqual(['1*0+5', '10-5'])
  expect(solve('00', 0).sort()).toEqual(['0*0', '0+0', '0-0'])
  expect(solve('3456237490', 9191)).toEqual([])
})

const solve = (xs, t) => {
  const len = xs.length

  if (len === 0) {
    return []
  }

  const res = []
  const fst = parseInt(xs[0])
  const expr = []

  const bt = (i, po, co, v) => {
    if (i === len) {
      if (v === t && co === 0) {
        res.push(expr.slice(1).join(``))
      }
      return
    }

    const x = parseInt(xs[i], 10)
    co = co * 10 + x

    if (co > 0) {
      bt(i + 1, po, co, v)
    }

    expr.push('+')
    expr.push(co)
    bt(i + 1, co, 0, v + co)
    expr.pop()
    expr.pop()

    if (expr.length > 0) {
      expr.push('-')
      expr.push(co)
      bt(i + 1, -co, 0, v - co)
      expr.pop()
      expr.pop()

      expr.push('*')
      expr.push(co)
      bt(i + 1, po * co, 0, v - po + (po * co))
      expr.pop()
      expr.pop()

    }
  }

  bt(0, 0, 0, 0)

  return res
}
