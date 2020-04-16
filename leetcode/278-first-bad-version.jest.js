// [https://leetcode.com/problems/first-bad-version]

/**
 * Definition for isBadVersion()
 *
 * @param {integer} version number
 * @return {boolean} whether the version is bad
 * isBadVersion = function(version) {
 *     ...
 * };
 */

/**
 * @param {function} isBadVersion()
 * @return {function}
 */
var solution = function(isBadVersion) {
  /**
   * @param {integer} n Total versions
   * @return {integer} The first bad version
   */
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

/*

b: 4

s: 1, e: 6, m: 3 -> f
s: 4, e: 6, m: 5 -> t
s: 4, e: 5, m: 4 -> t

b: 2
s: 1, e: 2, m: 1 -> f
s: 2, e: 2 -> 2

b: 1
s: 1, e: 2, m: 1 -> t
s: 1, e: 1 -> 1

*/
