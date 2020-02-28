test('empty array', () => {
  expect(rotate([], 1)).toEqual([])
})

test('single item array', () => {
  expect(rotate([1], 1)).toEqual([1])
})

test('two items are swapped on single rotation', () => {
  expect(rotate([1, 2], 1)).toEqual([2, 1])
})

test('items wrapping around', () => {
  expect(rotate([1, 2, 3], 1)).toEqual([3, 1, 2])
  expect(rotate([1, 2, 3], 2)).toEqual([2, 3, 1])
})

/*

1.

[1] 1 [1]
[1, 2] 1 [2, 1]
[1, 2, 3] 1 [3, 1, 2]


2.

[1] 1 [1]
[1, 2] 1 [1, 2]
[1, 2, 3] 1 [2, 3, 1]

3.

[1] 1 [1]
[1, 2] 1 [2, 1]
[1, 2, 3] 1 [1, 2, 3]


offset = rotation % length of array

/*
steps:
1. determine offset
2. create destination array
3. for each index in old array
    set value at new index in destination array
4. return destination array
*/

const rotate = (arr, by) => {
  const len = arr.length
  if (len <= 1) {
    return arr
  }

  const offset = by % len
  const dst = new Array(len).fill(undefined)

  for (let idx = 0; idx < len; idx++) {
    const newIdx = (idx + offset) % len
    dst[newIdx] = arr[idx]
  }

  return dst
}
