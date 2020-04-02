// [https://leetcode.com/problems/happy-number]

test('solve', () => {
  expect(solve(19)).toEqual(true)
  expect(solve(1)).toEqual(true)
  expect(solve(7)).toEqual(true)
  expect(solve(100)).toEqual(true)

  expect(solve(2)).toEqual(false)
})

const sum = (x, y) => x + y

const solve = x => {
  let s = x
  let set = new Set([s])

  while (true) {
    const s1 = s
      .toString()
      .split('')
      .map(y => parseInt(y, 10))
      .map(y => Math.pow(y, 2))
      .reduce(sum, 0)

    if (s1 === 1) {
      return true
    }

    // loop
    if (set.has(s1)) {
      return false
    }

    set.add(s1)

    s = s1
  }

  return false
}

solve(2)
