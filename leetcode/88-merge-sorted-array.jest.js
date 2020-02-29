// [https://leetcode.com/problems/merge-sorted-array]

/*
Given two sorted integer arrays nums1 and nums2, merge nums2 into nums1 as one sorted array.

Note:

The number of elements initialized in nums1 and nums2 are m and n respectively.
You may assume that nums1 has enough space (size that is greater or equal to m + n) to hold additional elements from nums2.
Example:

Input:
nums1 = [1,2,3,0,0,0], m = 3
nums2 = [2,5,6],       n = 3

Output: [1,2,2,3,5,6]
*/

test('in place sort - simple', () => {
  let xs = [1, 2, 3, 0]
  let ys = [2]

  merge(xs, 3, ys, ys.length)

  expect(xs).toEqual([1, 2, 2, 3])
})

test('leetcode', () => {
  const xs = [1,2,4,5,6,0]
  const ys = [3]
  merge(xs, 5, ys, 1)
  expect(xs).toEqual([1, 2, 3, 4, 5, 6])
})

test('in place sort - empty arrays', () => {
  let xs = []
  let ys = []

  merge(xs, 0, ys, ys.length)

  expect(xs).toEqual([])
})

test('in place sort - empty xs', () => {
  let xs = [0]
  let ys = [1]

  merge(xs, 0, ys, ys.length)

  expect(xs).toEqual([1])
})


test('in place sort - empty ys', () => {
  let xs = [1]
  let ys = []

  merge(xs, 1, ys, ys.length)

  expect(xs).toEqual([1])
})

const isUndefined = x => typeof x === 'undefined'

const merge = (xs, xL, ys, yL) => {
  let end = xL + yL - 1
  let xEnd = xL - 1
  let yEnd = yL - 1

  while (end >= 0) {
    const x = xs[xEnd]
    const y = ys[yEnd]
    if (isUndefined(y) || x >= y) {
      xs[end] = x
      xEnd--
    } else {
      xs[end] = y
      yEnd--
    }
    end--
  }
}
