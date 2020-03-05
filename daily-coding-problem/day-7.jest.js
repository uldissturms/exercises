/*

manually:

1 -> 'a' -> 1
11 -> 'aa', 'k' -> 2
111 -> 'aaa', 'ka', 'ak' -> 3

solve(0)
  cc -> '1'
  cn -> '1'
  c2 -> '11' v
  solve(1) -> 2
    cc -> '1'
    cn -> '1'
    c2 -> '11'
    solve(2) + (1)
    solve(3) + (1)
  solve(2) -> 1

*/

/*
steps:
1. when index >= length - 1 return 1
3. determine nr of combinations if take single character at a time
4. determine nr of combinations if take two characters at a time if valid
5. return sum of all combinations
*/

const fib = (num) => {
  var a = 1, b = 0, temp;

  while (num >= 0){
    temp = a;
    a = a + b;
    b = temp;
    num--;
  }

  return b;
}

test('solve', () => {
  // simple
  expect(solve('1')).toEqual(fib(1)) // 1
  expect(solve('11')).toEqual(fib(2)) // 2
  expect(solve('111')).toEqual(fib(3)) // 3
  expect(solve('1111')).toEqual(fib(4)) // 5
  expect(solve(new Array(10).fill('1').join(''))).toEqual(fib(10)) // 89

  // case where a letter would not be valid
  expect(solve('161')).toEqual(2)
})

test('solve - large input', () => {
  const largeInput = new Array(100).fill('1').join('')
  expect(solve(largeInput)).toEqual(fib(100))
})

const isUndefined = x => typeof x === 'undefined'

const solve = (xs, idx = 0, m = new Map()) => {
  if (m.has(idx)) {
    return m.get(idx)
  }

  if (idx >= xs.length - 1) {
    return 1
  }

  const cc = xs[idx]
  const cn = xs[idx + 1]

  const res = [
    (!isUndefined(cn) && parseInt(cc + cn, 10) <= 26) ? solve(xs, idx + 2, m) : 0,
    solve(xs, idx + 1, m),
  ].reduce((x, y) => x + y, 0)

  m.set(idx, res)

  return res
}
