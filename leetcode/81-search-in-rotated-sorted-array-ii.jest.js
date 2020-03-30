// [https://leetcode.com/problems/search-in-rotated-sorted-array-ii]

test('solve', () => {
  expect(solve([4, 5, 6, 7, 0, 1, 2], 0)).toEqual(4)
  expect(solve([4, 5, 6, 7, 0, 1, 2], 4)).toEqual(0)
  expect(solve([4, 5, 6, 7, 0, 1, 2], 2)).toEqual(6)
  expect(solve([5, 6, 0, 1, 2, 3, 4], 0)).toEqual(2)

  // non-existing element
  expect(solve([4, 5, 6, 7, 0, 1, 2], 3)).toEqual(-1)

  // not shifted
  const len = 7
  const notShifted = new Array(len).fill(0).map((_, i) => i)
  for (let i = 0; i < len; i++) {
    expect(solve(notShifted, i)).toEqual(i)
  }

  // empty
  expect(solve([], 0)).toEqual(-1)

  // single item
  expect(solve([0], 0)).toEqual(0)
  expect(solve([1], 0)).toEqual(-1)

  // two items
  expect(solve([1, 0], 0)).toEqual(1)
  expect(solve([1, 0], 1)).toEqual(0)

  // duplicates
  expect(solve([1, 1], 0)).toEqual(-1)
  expect(solve([1, 1], 1)).toEqual(0)
  expect(solve([1, 2, 2, 3], 2)).toEqual(1)

  expect(solve([1, 3, 1, 1, 1], 3)).toEqual(1)
  expect(solve([1, 1, 1, 3, 1], 3)).toEqual(3)
  expect(solve([1, 1, 3, 1], 3)).toEqual(2)
  expect(solve([1, 3, 1, 1], 3)).toEqual(1)

  expect(solve([1, 2, 3, 1, 1, 5], 5)).toEqual(5)
  expect(solve([1, 1, 1, 1, 3, 1], 3)).toEqual(4)
  expect(solve([1, 3, 1, 1, 1, 1], 3)).toEqual(1)
})

const defaultTo = (x, o) => (o == null ? x : o)

const NOT_FOUND = -1

const solve = (xs, num) => {
  const len = xs.length

  const bsShift = (sI, eI) => {
    const mI = Math.floor((sI + eI) / 2)
    const mV = xs[mI]
    const sV = xs[sI]
    const eV = xs[eI]

    if (mI > 0 && xs[mI] < xs[mI - 1]) {
      return mI
    }

    if ((sI + 1) >= eI) {
      return sV > eV ? eI : undefined
    }

    if (mV < sV) {
      return bsShift(sI, mI)
    }

    if (mV > eV) {
      return bsShift(mI, eI)
    }

    const left = bsShift(sI, mI)

    if (left == null) {
      return bsShift(mI, eI)
    }

    return left
  }

  const shift = defaultTo(0, bsShift(0, len))

  const adjustForShift = x => (x + shift) % len

  const bsNum = (sI, eI) => {
    const mI = Math.floor((sI + eI) / 2)
    const mAI = adjustForShift(mI)
    const mV = xs[mAI]

    if (mV === num) {
      return mAI
    }

    if (sI >= eI) {
      return undefined
    }

    if (mV < num) {
      return bsNum(mI + 1, eI)
    }

    return bsNum(sI, mI - 1)
  }

  return defaultTo(NOT_FOUND, bsNum(0, len - 1))
}

/*

fastest leetcode solution

let l = 0;
  let r = nums.length - 1;
  while(l <= r){
      while(nums[l] === nums[r]){
          if(nums[l] === target) return true;
          l++;
          if(l === r) return false;
      }

      let m = Math.floor((l + r)/2);
      if(nums[m] === target) return true;

      if(nums[m] >= nums[l]){
         if(nums[m] >= target && target >= nums[l]){
             r = m - 1;
         } else {
             l = m + 1;
         }
      } else {
          if(nums[m] <= target && target <= nums[r]){
              l = m + 1;
          } else {
              r = m - 1;
          }
      }
  }
  return false;

 */
