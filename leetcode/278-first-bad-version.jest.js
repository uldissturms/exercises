// [https://leetcode.com/problems/first-bad-version]

test('solve', () => {
  const isBadVersion = x => x >= 4
  expect(solution(isBadVersion)(20)).toEqual(4)
  expect(solution(isBadVersion)(10)).toEqual(4)
})

const solution = (isBadVersion) => {
  return function(n) {
    const bs = (s, e) => {
      if (s === e) {
        return s
      }

      const m = Math.floor((s + e) / 2)
      const mB = isBadVersion(m)

      if (mB) {
        return bs(s, m)
      }

      return bs(m + 1, e)
    }

    return bs(1, n)
  }
}
