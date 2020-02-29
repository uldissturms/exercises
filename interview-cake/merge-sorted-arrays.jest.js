// [https://www.interviewcake.com/question/javascript/merge-sorted-arrays]

/*
Each order is represented by an "order id" (an integer).

We have our lists of orders sorted numerically already, in arrays. Write a function to merge our arrays of orders into one sorted array.

For example:

  const myArray = [3, 4, 6, 10, 11, 15];
const alicesArray = [1, 5, 8, 12, 14, 19];

console.log(mergeArrays(myArray, alicesArray));
// logs [1, 3, 4, 5, 6, 8, 10, 11, 12, 14, 15, 19]
*/

test('merge empty arrays', () => {
  expect(merge([], [])).toEqual([])
})

test('one of arrays is empty', () => {
  expect(merge([], [1])).toEqual([1])
  expect(merge([1], [])).toEqual([1])
})

test('bot arrays have same size of arrays', () => {
  expect(merge([1, 4, 5], [2, 3, 6])).toEqual([1, 2, 3, 4, 5, 6])
})

test('different size of arrays', () => {
  expect(merge([1, 3, 5], [2, 4])).toEqual([1, 2, 3, 4, 5])
  expect(merge([2, 4], [1, 3, 5])).toEqual([1, 2, 3, 4, 5])
})

/*
resoning:
keep 2 pointers to always insert the smallest item from both arrays
*/

/*
steps:
1. init destination array to the size of sum of both array length
2. set pointers to start of the corresponding arrays
3. while any pointers are less than their arrays
    set the destination item to the value of the smallest item // handle undefines
    increment the smaller pointer by one
*/

const isUndefined = x => typeof x === 'undefined'
const merge = (xs, ys) => {
  const dst = new Array(xs.length + ys.length)
  let xIdx = 0
  let yIdx = 0
  while (xIdx < xs.length || yIdx < ys.length) {
    const idx = xIdx + yIdx
    const x = xs[xIdx]
    const y = ys[yIdx]
    let val
    if (isUndefined(x) || x > y) { // only ys left, or y is less than x
      val = y
      yIdx++
    } else { // y is undefined, x is less or equal to y
      val = x
      xIdx++
    }
    dst[idx] = val
  }
  return dst
}
