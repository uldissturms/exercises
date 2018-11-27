const test = require('ava')
const {kthLargest, kthSmallest} = require('./quickselect')

test('returns k largest item', t => {
  const arr = [3, 2, 4, 6, 7, 5, 5]
  t.is(kthLargest(arr, 1), 7)
  t.is(kthLargest(arr, 2), 6)
  t.is(kthLargest(arr, 3), 5)
  t.is(kthLargest(arr, 4), 5)
  t.is(kthLargest(arr, 5), 4)
  t.is(kthLargest(arr, 6), 3)
  t.is(kthLargest(arr, 7), 2)
})

test('returns k smallest item', t => {
  const arr = [3, 2, 4, 6, 7, 5, 5]
  t.is(kthSmallest(arr, 3), 4)
})

test('returns undefined for invalid input', t => {
  t.is(kthLargest([], 1), undefined)
  t.is(kthLargest([1], 0), undefined)
  t.is(kthLargest([1], -1), undefined)
})

test('returns largest for single item array', t => {
  t.is(kthLargest([1], 1), 1)
})
