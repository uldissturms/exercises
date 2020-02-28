test('no gap', () => {
  expect(largestGap(0)).toEqual(0) // 0
  expect(largestGap(1)).toEqual(0) // 1
  expect(largestGap(2)).toEqual(0) // 10
  expect(largestGap(3)).toEqual(0) // 11
  expect(largestGap(4)).toEqual(0) // 100
})

test('gap', () => {
  expect(largestGap(5)).toEqual(1) // 101
  expect(largestGap(593)).toEqual(3) // 1001010001
  expect(largestGap(1186)).toEqual(3) // 10010100010
})

/*
0 - 0
1 - 0
10 - 0
11 - 0
100 - 0
101 - 1

1001010001 - 3
10010100010 - 3
*/

/*
steps:
1. to binary string
2. init max range to 0
3. for each index
  if 1
    finish previous range if started and compare to max range
    start a new range
  if 0
    add to active range
4. return max range
*/

const isUndefined = x => typeof x === 'undefined'
const largestGap = (x) => {
  let max = 0
  let curr = undefined
  const arr = x.toString('2')
  for (const c of arr) {
    if (c === '1') {
      max = Math.max(curr || 0, max)
      curr = 0
    } else if (!isUndefined(curr)) {
      curr++
    }
  }
  return max
}
