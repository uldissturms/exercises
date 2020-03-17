test('solve', () => {
  expect(solve(1)).toEqual(true)
  expect(solve(2)).toEqual(false)
  expect(solve(3)).toEqual(false)
  expect(solve(4)).toEqual(true)
  expect(solve(5)).toEqual(false)
  expect(solve(9)).toEqual(true)
  expect(solve(25)).toEqual(true)
})

const solve = (x) => {

  const bs = (s, e) => {

    if (Math.pow(s, 2) === x) {
      return true
    }

    if (Math.pow(e, 2) === x) {
      return true
    }

    if (s + 1 >= e) {
      return false
    }

    const m = Math.floor((s + e) / 2)

    if (Math.pow(m, 2) >= x) {
      return bs(s, m)
    }

    return bs(m, e)

  }

  return bs(1, x)
}

/*
1 -> bs(1, 1) -> true
2 -> bs(1, 2) -> false
3 -> bs(1, 3) -> bs(2, 3) -> false
4 -> bs(1, 4) -> bs(2, 4) -> true
5 -> bs(1, 5) -> bs(1, 3) -> bs(2, 3) -> false
25 -> bs(1, 25) -> bs(1, 13) -> bs(1, 7) -> bs(4, 7) -> bs(4, 5) -> true
*/
