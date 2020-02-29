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

test('merge multiple arrays', () => {
  expect(merge([1, 4], [2, 5, 7], [3, 6])).toEqual([1, 2, 3, 4, 5, 6, 7])
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

const sum = (x, y) => x + y

const isUndefined = x => typeof x === 'undefined'

const getMin = (arrs, ptrs) => {
  let minPtrIdx
  let minVal
  ptrs.forEach((p, pIdx) => {
    const curr = arrs[pIdx][p]
    if (!isUndefined(curr) && (curr < minVal || isUndefined(minPtrIdx))) {
      minVal = curr
      minPtrIdx = pIdx
    }
  })
  return [minPtrIdx, minVal]
}

const merge = (...arrs) => {
  const dst = new Array(arrs.map(x => x.length).reduce(sum, 0))
  const ptrs = new Array(arrs.length).fill(0)
  while (ptrs.some((x, idx) => x < arrs[idx].length)) {
    const idx = ptrs.reduce(sum, 0)
    const [ptrIdx, val] = getMin(arrs, ptrs)
    ptrs[ptrIdx] = ptrs[ptrIdx] + 1
    dst[idx] = val
  }
  return dst
}
