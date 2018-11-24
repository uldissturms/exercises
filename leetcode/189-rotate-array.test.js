// [https://leetcode.com/problems/rotate-array]
const {clone} = require('../helpers')
const test = require('ava')

test('rotates three element array', (t) => {
  const arr = [1, 2, 3]
  testRotationFor(arr, 1, t)
  testRotationFor(arr, 2, t)
  testRotationFor(arr, 3, t)
})

test('rotates bigger array', (t) => {
  const arr = [1, 2, 3, 4, 5, 6, 7]
  testRotationFor(arr, 1, t)
  testRotationFor(arr, 2, t)
  testRotationFor(arr, 3, t)
  testRotationFor(arr, 4, t)
  testRotationFor(arr, 5, t)
  testRotationFor(arr, 6, t)
})

test('rotates large array', (t) => {
  const arr = new Array(1000).fill(0).map((_, idx) => idx)
  testRotationFor(arr, 121, t)
})

test('validate length', (t) => {
  t.deepEqual(rotate([], 1), [])
})

const expectedFor = (arr, k) => {
  const tmp = clone(arr)
  for (let i = 0; i < k; i++) {
    tmp.unshift(tmp.pop())
  }
  return tmp
}

const testRotationFor = (arr, k, t) => {
  t.deepEqual(rotate(clone(arr), k), expectedFor(arr, k))
}

const swap = (x, y, arr) => {
  const tmp = arr[x]
  arr[x] = arr[y]
  arr[y] = tmp
  return arr
}

const reverse = (arr, from, to) => {
  while (from < to) {
    swap(from, to, arr)
    from++
    to--
  }
}

const rotate = (arr, k = 0) => {
  let len = arr.length
  const kAdjusted = k % len

  const splitAt = len - kAdjusted

  reverse(arr, 0, splitAt - 1)
  reverse(arr, splitAt, len - 1)
  reverse(arr, 0, len - 1)

  return arr
}
