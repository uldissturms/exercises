// [https://leetcode.com/problems/meeting-rooms-ii]

test('solve', () => {
  expect(solve([[0, 30], [5, 10], [15, 20]])).toEqual(2)
  expect(solve([[7, 10], [2, 4]])).toEqual(1)
})

const solve = is => {
  const byVal = (x, y) => x - y

  const ss = is.map(([s]) => s).sort(byVal)
  const es = is.map(([, e]) => e).sort(byVal)

  let sI = 0
  let eI = 0

  let c = 0
  let m = 0

  while (sI < ss.length) {
    const s = ss[sI]
    const e = es[eI]

    if (s === e) {
      sI++
      eI++
    } else if (s < e) {
      c++
      sI++
    } else {
      c--
      eI++
    }

    m = Math.max(m, c)
  }

  return m
}
