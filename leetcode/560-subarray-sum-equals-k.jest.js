// [https://leetcode.com/problems/subarray-sum-equals-k]

test('solve', () => {
  expect(solve([1, 1, 1], 2)).toEqual(2)
  expect(solve([-1, 0, 1, 2, -1, -5, 3], 2)).toEqual(4)
  expect(solve([3, 4, 7, 2, -3, 1, 4, 2, 1], 7)).toEqual(6)
})

const solveOptimal = (xs, k) => {
  let s = 0
  let counts = 0

  const m = new Map()
  for (const x of xs) {
    s += x

    const d = s - k

    counts += m.get(d) || 0

    if (d === 0) {
      counts++
    }

    m.set(s, (m.get(s) || 0) + 1)
  }

  return counts
}

const solveBF = (xs, k) => {
  let c = 0
  for (let i = 0; i < xs.length; i++) {
    let s = 0
    for (let j = i; j < xs.length; j++) {
      s += xs[j]
      if (s === k) {
        c++
      }
    }
  }
  return c
}

const solve = solveOptimal
