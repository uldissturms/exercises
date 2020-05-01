// [https://leetcode.com/problems/3sum]

test('solve', () => {
  expect(solve([-1, 0, 1, 2, -1, -4])).toEqual([[-1, -1, 2], [-1, 0, 1]])
  expect(solve([-2, 0, 0, 2, 2])).toEqual([[-2, 0, 2]])
})

// n**2
const solve = xs => {
  // nlogn
  xs.sort((x, y) => x - y)

  const len = xs.length
  const res = []

  const twoSum = (i, x) => {
    let l = i + 1
    let h = len - 1

    while (l < h) {
      const lv = xs[l]
      const hv = xs[h]
      const s = lv + hv + x
      if (s < 0 || (l > i + 1 && lv === xs[l - 1])) {
        l++
      } else if (s > 0 || (h < len - 1 && hv === xs[h + 1])) {
        h--
      } else {
        res.push([x, lv, hv])
        l++
        h--
      }
    }
  }

  // n**2
  for (let i = 0; i < len; i++) {
    const x = xs[i]

    if (x > 0) {
      return res
    }

    if (i === 0 || xs[i - 1] !== x) {
      twoSum(i, x)
    }
  }

  return res
}
