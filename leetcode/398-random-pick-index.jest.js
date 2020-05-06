// [https://leetcode.com/problems/random-pick-index]

test('solve', () => {
  expect(solve([1, 2, 3, 3, 3], 1)).toEqual(0)
  expect(solve([1, 2, 3, 3, 3], 2)).toEqual(1)
  expect([2, 3, 4]).toContain(solve([1, 2, 3, 3, 3], 3))
})

test('solve - randomFor', () => {
  const from = 1
  const to = 2
  const count = 100

  const rs = new Array(count).fill().map(() => randomFor(from, to))
  const fs = rs.filter(r => r === from)
  const ts = rs.filter(r => r === to)

  const fourtyP = count * 0.4

  expect(fs.length).toBeGreaterThan(fourtyP)
  expect(ts.length).toBeGreaterThan(fourtyP)
})

const randomFor = (l, h) => {
  const d = h + 1 - l
  return l + Math.floor(Math.random() * d)
}

const countsFor = (xs, t) => {
  let c = 0
  for (const x of xs) {
    if (x === t) {
      c++
    }
  }
  return c
}

const solve = (xs, t) => {
  const c = countsFor(xs, t)

  let r = randomFor(1, c)

  for (let i = 0; i < xs.length; i++) {
    const x = xs[i]
    if (x === t) {
      r--
      if (r === 0) {
        return i
      }
    }
  }
}

/**
 * @param {number[]} nums
 */
var Solution = function(nums) {
  this.xs = nums
}

/**
 * @param {number} target
 * @return {number}
 */
Solution.prototype.pick = function(target) {
  return solve(this.xs, target)
}

/**
 * Your Solution object will be instantiated and called as such:
 * var obj = new Solution(nums)
 * var param_1 = obj.pick(target)
 */
