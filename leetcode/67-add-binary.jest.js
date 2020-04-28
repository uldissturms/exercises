// [https://leetcode.com/problems/add-binary]

test('solve', () => {
  expect(solve('0', '0')).toEqual('0')
  expect(solve('0', '1')).toEqual('1')
  expect(solve('1', '0')).toEqual('1')
  expect(solve('1', '1')).toEqual('10')
  expect(solve('111', '1')).toEqual('1000')

  // examples
  expect(solve('11', '1')).toEqual('100')
  expect(solve('1010', '1011')).toEqual('10101')
})

const add = (x, y, carry) => {
  if (x === '0' && y === '0') {
    return [carry, '0']
  }

  if (x === '1' && y === '1') {
    return [carry, '1']
  }

  if (carry === '1') {
    return ['0', '1']
  }

  return ['1', '0']
}

const solve = (xs, ys) => {
  const len = Math.max(xs.length, ys.length)
  const xLen = xs.length
  const yLen = ys.length

  const res = []
  let carry = '0'

  for (let i = 0; i < len; i++) {
    const xI = xLen - i - 1
    const yI = yLen - i - 1

    const x = xs[xI] || '0'
    const y = ys[yI] || '0'

    const [r, c] = add(x, y, carry)

    carry = c

    res.push(r)
  }

  if (carry === '1') {
    res.push(carry)
  }

  return res.reverse().join('')
}
