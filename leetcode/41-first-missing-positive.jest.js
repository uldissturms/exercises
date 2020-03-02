// [https://leetcode.com/problems/first-missing-positive]

/*

manually

[1, 2, 0] -> 3

[3, 4 -1, 1] -> 2
[1, 4, 3, 4] -> 2


[7, 8, 9, 11, 12] -> 1
[7, 8, 9, 11, 12]


[5, 4, 3, 2, 1] -> 6
[1, 2, 3, 4, 5]

*/

/*

reasoning:

use input array as a dict of idx -> idx + 1

*/

/*

steps:
1. adjust input array to be 'dict' where i -> n where n = i + 1 for all n > 0 // keep in mind the value that overriding
2. for each index in array
   if (i != n) {
     return n
   }
3. all items in array return arr.length + 1 as the min missing number
*/

test('solve', () => {
  expect(solve([1, 2, 0])).toEqual(3)
  expect(solve([7, 8, 9, 11, 12])).toEqual(1)
  expect(solve([3, 4, -1, 1])).toEqual(2)
  expect(solve([5, 4, 3, 2, 1])).toEqual(6)
  expect(solve([1, 2, 3, 4, 5])).toEqual(6)
  expect(solve([2, 1, 0, 5, 4])).toEqual(3)
})

const solve = (arr) => {
  // update item for value v
  const update = (v) => {
    if (v <= 0) {
      return
    }

    if (v > arr.length) {
      return
    }

    const tmp = arr[v - 1]
    if (tmp !== v) {
      arr[v - 1] = v
      update(tmp)
    }
  }

  // build dict
  for (let i = 0; i < arr.length; i++) {
    const v = arr[i]
    update(v)
  }
  // check for missing int in list
  for (let i = 0; i < arr.length; i++) {
    const v = arr[i]
    if (v !== i + 1) {
      return i + 1
    }
  }

  return arr.length + 1
}
