test('solve', () => {
  expect(solve([1, 2, 3, 1])).toEqual(2)
  expect(solve([1, 2, 1, 3, 5, 6, 4])).toEqual(5)
})

const solve = (nums) => {
  const bs = (sI, eI) => {
    const mI = Math.floor((sI + eI) / 2)

    const p = nums[mI - 1]
    const c = nums[mI]
    const n = nums[mI + 1]

    // c is peak
    if ((p == null || c > p) && (n == null || c > n)) {
      return mI
    }

    // c greater than prev elem
    if (p == null || c > p) {
      return bs(mI + 1, eI)
    }

    return bs(sI, mI - 1)
  }

  return bs(0, nums.length - 1)
}
