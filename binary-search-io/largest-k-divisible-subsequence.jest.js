const { largeArray } = require('./large-array')
/*
Largest k-divisible subsequence
Given an array nums of integers greater than or equal to 0, and k, a positive integer less than 10, find the maximum sum subsequence of nums such that the sum is divisible by k.

Example 1
Input

nums = [2, 6, 4, 1]
k = 1
Output

13
Explanation

The sum of the whole array is 13, which is divisible by 1.

Example 2
Input

nums = [5]
k = 2
Output

0
Explanation

5 is not divisible by 2 so the subsequence is empty.

Example 3
Input

nums = [3, 8, 5, 6, 1]
k = 3
Output

18
Explanation

[3, 8, 6, 1] sums to 18 which is divisible by 3.
*/

/*

manually:

[4, 2, 7]

        2, 0
      [           ]
    1, 0          1, 7
    [   ]  [ ]   [... ]
  0, 0     0, 2         0, 9
[  ]       [  ]        [     ]
   4 -> 0  2   6 -> 2  9 -> 3 13 -> 0

*/

/*
reasoning:
use dp to select the best options
*/

/*
steps:
for each index
  keep track of sum
  decide whether or not to take the current item based on best sum that is divisible by k
memoize solution
*/

/*
edge cases:
no sum works -> zero
*/

test.only('solve', () => {
  expect(solve([2, 6, 4, 1], 1)).toBe(13)
  expect(solve([1], 0)).toBe(0)
  expect(solve([], 3)).toBe(0)
  expect(solve([4, 2, 7], 3)).toBe(9)
  expect(solve([1, 2, 3], 7)).toBe(0)
})

test('solve - bigger input', () => {
  const xs = [0, 3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36, 39, 42, 45, 48, 51, 54, 57, 60, 63, 66, 69, 72, 75, 78, 81, 84, 87, 90, 93, 96, 99, 102, 105, 108, 111, 114, 117, 120, 123, 126, 129, 132, 135, 138, 141, 144, 147, 150, 153, 156, 159, 162, 165, 168, 171, 174, 177, 180, 183, 186, 189, 192, 195, 198, 201, 204, 207, 210, 213, 216, 219, 222, 225, 228, 231, 234, 237, 240, 243, 246, 249, 252, 255, 258, 261, 264, 267, 270, 273, 276, 279, 282, 285, 288, 291, 294, 297, 1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 2, 5, 8, 11, 14, 17, 20, 23, 26, 29]
  const k = 3
  expect(solve(xs, k)).toEqual(15303)
})


test.only('solve - large input', () => {
  expect(solve(largeArray, 3)).toEqual(149985453)
})

const isDivisible = (x, y) => x % y === 0

const keyFor = (i, s) => `${i}_${s}`

const solve = (xs, k) => {
  const ys = []
  let sum = 0
  for (const x of xs) {
    if (isDivisible(x, k)) {
      sum += x
    } else {
      ys.push(x)
    }
  }

  return dp(ys, k) + sum
}

const dp = (xs, k, i = xs.length - 1, sum = 0, memo = new Map()) => {
  const x = xs[i]

  if (i < 0) {
    return 0
  }

  if (i === 0) {
    return isDivisible(sum + x, k) ? sum + x : isDivisible(sum, k) ? sum : 0
  }

  const key = keyFor(i, sum)

  if (memo.has(key)) {
    return memo.get(key)
  }

  const take = dp(xs, k, i - 1, sum + x, memo)
  const dontTake = dp(xs, k, i - 1, sum, memo)

  const best = Math.max(take, dontTake)

  memo.set(key, best)

  return best
}

/*
alternative solution by someone else using iterative code

hint: Represent the state as DP[pos][mod]: maximum possible sum starting in the position "pos" in the array where the current sum modulo 3 is equal to mod.

class Solution {
    solve(nums, k) {
        let best_by_res = [];
        best_by_res[-1] = [];
        for (let r = 0; r < k; r++) {
            best_by_res[-1][r] = -1/0;
        }
        best_by_res[-1][0] = 0;

        for (let i = 0; i < nums.length; i++) {
            best_by_res[i] = [];
            let n = nums[i];

            for (let r = 0; r < k; r++) {
                let r_n = (r + n) % k;
                best_by_res[i][r_n] = Math.max(best_by_res[i - 1][r] + n, best_by_res[i - 1][r_n]);
            }
        }
        console.log(best_by_res);
        return best_by_res[nums.length - 1][0];
    }
}
*/
