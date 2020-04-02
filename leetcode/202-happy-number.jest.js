// [https://leetcode.com/problems/happy-number]

test('solve - set', () => {
  expect(solve(19)).toEqual(true)
  expect(solve(1)).toEqual(true)
  expect(solve(7)).toEqual(true)
  expect(solve(100)).toEqual(true)

  // false
  expect(solve(2)).toEqual(false)
})

test('solve - slow and fast pointers', () => {
  expect(solveSF(19)).toEqual(true)
  expect(solveSF(1)).toEqual(true)
  expect(solveSF(7)).toEqual(true)
  expect(solveSF(100)).toEqual(true)

  // false
  expect(solveSF(2)).toEqual(false)
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

const next = (n) => {
  const b = 10
  let x = n
  let res = 0
  while (x) {
    const t = x % b
    res += Math.pow(t, 2)
    x = Math.floor(x / b)
  }
  return res
}

const solveSF = (n) => {
  let s = n
  let f = next(n)

  while (s !== f) {
    s = next(s)
    f = next(next(f))
  }

  return s === 1
}
