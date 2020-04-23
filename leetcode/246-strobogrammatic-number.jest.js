// [https://leetcode.com/problems/strobogrammatic-number]

test('solve', () => {
  expect(solve('69')).toEqual(true)
  expect(solve('88')).toEqual(true)
  expect(solve('101')).toEqual(true)
  expect(solve('962')).toEqual(false)
})

const pairs = {
  '0': '0',
  '1': '1',
  '6': '9',
  '8': '8',
  '9': '6',
}

const solve = (xs) => {
  let bI = 0
  let fI = xs.length - 1
  let mI = Math.floor((bI + fI) / 2)

  while (bI <= mI) {
    const b = xs[bI]
    const f = xs[fI]

    if (pairs[b] !== f) {
      return false
    }

    bI++
    fI--
  }

  return true
}

