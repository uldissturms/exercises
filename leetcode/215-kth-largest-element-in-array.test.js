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
  t.deepEqual(kthLargest([], 1), undefined)
})

test('returns undefined if lenght of array < k', t => {
  t.deepEqual(kthLargest([1], 2), undefined)
})

test('returns undefined if k is zero or negative', t => {
  t.deepEqual(kthLargest([1], 0), undefined)
  t.deepEqual(kthLargest([1], -1), undefined)
})

const kthLargest = (arr, k) => {
  if (k <= 0) {
    return undefined
  }
  if (arr.length === 0 || arr.length < k) {
    return undefined
  }

  let max
  let maxIdx
  const except = {}

  for (let i = 0; i < k; i++) {
    max = undefined
    maxIdx = undefined
    for (const idx in arr) {
      if ((isUndefined(max) || arr[idx] > max) && !has(idx, except)) {
        max = arr[idx]
        maxIdx = idx
      }
    }
    except[maxIdx] = true
  }

  return max
}
