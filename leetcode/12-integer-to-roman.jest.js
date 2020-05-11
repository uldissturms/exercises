// [https://leetcode.com/problems/integer-to-roman]

test('solve', () => {
  expect(solve(1)).toEqual('I')
  expect(solve(2)).toEqual('II')
  expect(solve(3)).toEqual('III')
  expect(solve(4)).toEqual('IV')
  expect(solve(5)).toEqual('V')
  expect(solve(6)).toEqual('VI')
  expect(solve(90)).toEqual('XC')
  expect(solve(200)).toEqual('CC')
  expect(solve(1993)).toEqual('MCMXCIII')
  expect(solve(1954)).toEqual('MCMLIV')
  expect(solve(1990)).toEqual('MCMXC')
  expect(solve(2014)).toEqual('MMXIV')
  expect(solve(2016)).toEqual('MMXVI')
  expect(solve(9999)).toEqual('MMMMMMMMMCMXCIX')
  expect(solve(10000)).toEqual('MMMMMMMMMM')
})

const bs = [
  [1000, 'M'],
  [900, 'CM'],
  [500, 'D'],
  [400, 'CD'],
  [100, 'C'],
  [90, 'XC'],
  [50, 'L'],
  [40, 'XL'],
  [10, 'X'],
  [9, 'IX'],
  [8, 'VIII'],
  [7, 'VII'],
  [6, 'VI'],
  [5, 'V'],
  [4, 'IV'],
  [3, 'III'],
  [2, 'II'],
  [1, 'I']
]

const solve = n => {
  let x = n
  let r = []

  for (let i = 0; i < bs.length; i++) {
    const [b, s] = bs[i]
    if (b <= x) {
      r.push(s)
      x -= b
      i--
    }
  }

  return r.join(``)
}
