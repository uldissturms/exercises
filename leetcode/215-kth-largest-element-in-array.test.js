// [https://leetcode.com/problems/kth-largest-element-in-an-array]

const test = require('ava')
const {has, isUndefined} = require('../helpers')

test('returns largest from array containing distinct values', t => {
  t.deepEqual(kthLargest([3, 2, 1, 5, 6, 4], 2), 5)
})

test('returns largest from array containing duplicate values', t => {
  t.deepEqual(kthLargest([3, 2, 3, 1, 2, 4, 5, 5, 6], 4), 4)
})

test('empty array returns undefined as max', t => {
  t.deepEqual(kthLargest([], 2), undefined)
})

const kthLargest = (arr, k) => {
  if (arr.length === 0) {
    return undefined
  }

  return getMaxExcept(arr, k, {})
}

const getMaxExcept = (arr, k, except = {}) => {
  let max
  let maxIdx

  for (const idx in arr) {
    if ((isUndefined(max) || arr[idx] > max) && !has(idx, except)) {
      max = arr[idx]
      maxIdx = idx
    }
  }

  return k === 1
    ? max
    : getMaxExcept(arr, k - 1, Object.assign({[maxIdx]: true}, except))
}
