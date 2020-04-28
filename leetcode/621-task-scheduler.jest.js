// [https://leetcode.com/problems/task-scheduler]

test('solve', () => {
  expect(solve([], 2)).toEqual(0)
  expect(solve(['A'], 2)).toEqual(1)
  expect(solve(['A', 'B'], 2)).toEqual(2)
  expect(solve(['A', 'A'], 2)).toEqual(4)
  expect(solve(['A', 'A'], 0)).toEqual(2)
  expect(solve(['A', 'B', 'A'], 0)).toEqual(3)
  expect(solve(['A', 'B', 'A'], 1)).toEqual(3)
  expect(solve(['A', 'B', 'A'], 2)).toEqual(4)

  expect(solve(['A', 'A', 'A', 'B', 'B', 'B'], 2)).toEqual(8)
  expect(
    solve(['A', 'A', 'A', 'A', 'A', 'A', 'B', 'C', 'D', 'E', 'F', 'G'], 2)
  ).toEqual(16)
  expect(solve(['A', 'B', 'C', 'D', 'E', 'A', 'B', 'C', 'D', 'E'], 4)).toEqual(10)
})

// time: O(n), space: O(t), when n = |tasks|, t = {tasks}, (A - Z makes it 26 at most)
const solve = (xs, n) => {
  const len = xs.length

  if (len < 2) {
    return len
  }

  // count
  let m = 0
  const cs = new Map()
  for (const x of xs) {
    const c = (cs.get(x) || 0) + 1
    cs.set(x, c)
    if (c > m) {
      m = c
    }
  }

  // how many max tasks
  let ml = 0
  for (const [k, v] of cs) {
    if (v === m) {
      ml++
    }
  }

  let minL = m * (n + 1) - n

  let e = n * Math.max(0, m - 1)
  let maxThatFit = Math.max(0, Math.min(n, ml - 1))

  minL += maxThatFit
  e = Math.max(0, e - ((m - 1) * maxThatFit))

  const maxLeft = ml - 1 - maxThatFit

  minL += maxLeft * m

  // all except the most task of the same
  const left = len - m * ml

  return minL + Math.max(0, left - e)
}
