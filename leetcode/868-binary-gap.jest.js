// [https://leetcode.com/problems/binary-gap]

test('no consequtive 1s', () => {
  expect(binaryGap(0)).toEqual(0)
  expect(binaryGap(1)).toEqual(0)
  expect(binaryGap(2)).toEqual(0)
})

test('empty binary gap', () => {
  expect(binaryGap(3)).toEqual(1)
})

test('single space between 1s', () => {
  expect(binaryGap(5)).toEqual(2)
})

const isUndefined = x => typeof x === 'undefined'
const binaryGap = (x) => {
  let max = -1
  let curr = undefined

  const arr = x.toString('2')
  for (const c of arr) {
    if (c === '1') {
      if (!isUndefined(curr)) {
        max = Math.max(curr, max)
      }
      curr = 0
    } else if (!isUndefined(curr)) {
      curr++
    }
  }

  return max + 1
}
