test('solve', () => {
  expect(solve(5, [3, 4, 4, 6, 1, 4, 4])).toEqual([3, 2, 2, 4, 2])
  expect(solve(1, [1])).toEqual([1])
  expect(solve(1, [1, 2])).toEqual([1])
  expect(solve(1, [2])).toEqual([0])
})

test('solve - time', () => {
  const max = 100000
  expect(solve(max, new Array(max).fill(max + 1))).toEqual(new Array(max).fill(0))
})

const solve = (n, as) => {
  const init = 0
  let ns = new Array(n).fill(init)
  let max = init
  let maxSet = init

  const setToMax = () => {
    for (let i = 0; i < ns.length; i++) {
      ns[i] = max
    }
    min = max
  }

  for (const a of as) {
    if (a == n + 1) {
      maxSet = max
    } else {
      const v = Math.max(maxSet, ns[a - 1]) + 1
      ns[a - 1] = v
      if (v > max) {
        max = v
      }
    }
  }

  for (let i = 0; i < n; i++) {
    ns[i] = Math.max(ns[i], maxSet)
  }

  return ns
}

/*
keep track of max and set value Math.max(maxSet, ns[a - 1]) + 1 on each increment
fill in all the zeros with max value set at the end
*/
