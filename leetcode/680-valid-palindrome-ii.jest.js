// [https://leetcode.com/problems/valid-palindrome-ii]

test('solve', () => {
  // 0 edits
  expect(solve('')).toEqual(true)
  expect(solve('a')).toEqual(true)
  expect(solve('aa')).toEqual(true)
  expect(solve('aba')).toEqual(true)
  expect(solve('aaaa')).toEqual(true)
  expect(solve('abba')).toEqual(true)

  // 1 edit
  expect(solve('ab')).toEqual(true)
  expect(solve('abb')).toEqual(true)
  expect(solve('bba')).toEqual(true)
  expect(solve('aacbaa')).toEqual(true)
  expect(solve('abaaaaaaa')).toEqual(true)
  expect(solve('baaaaaaaa')).toEqual(true)
  expect(solve('aaaaaaaab')).toEqual(true)
  expect(solve('aaaaaaaba')).toEqual(true)

  // more than 1 edit
  expect(solve('abc')).toEqual(false)
  expect(solve('caaaab')).toEqual(false)
  expect(solve('acaaab')).toEqual(false)
  expect(solve('acaaba')).toEqual(false)
  expect(solve('aacdbaa')).toEqual(false)

  // large input
  expect(solve(new Array(50000).fill('a').join(''))).toEqual(true)
})

const solveR = xs => {
  const bt = (l, r, c) => {
    const lx = xs[l]
    const rx = xs[r]

    if (l >= r) {
      return c < 2
    }

    if (c === 2) {
      return false
    }

    if (lx !== rx) {
      return bt(l + 1, r, c + 1) || bt(l, r - 1, c + 1)
    }

    return bt(l + 1, r - 1, c)
  }

  return bt(0, xs.length - 1, 0)
}

const solveI = xs => {
  const deleteChar = f => {
    let l = 0
    let r = xs.length - 1
    let c = 0

    while (l < r) {
      const lx = xs[l]
      const rx = xs[r]
      if (lx === rx) {
        l++
        r--
      } else if (c === 0) {
        ;[l, r] = f(l, r)
        c++
      } else {
        return false
      }
    }

    return true
  }

  return deleteChar((l, r) => [l + 1, r]) || deleteChar((l, r) => [l, r - 1])
}

const isPalindrome = (l, r, xs) => {
  while (l < r) {
    const lx = xs[l]
    const rx = xs[r]

    if (lx !== rx) {
      return false
    }

    l++
    r--
  }

  return true
}

const solveCleaner = xs => {
  let l = 0
  let r = xs.length - 1
  while (l < r) {
    const lx = xs[l]
    const rx = xs[r]
    if (lx !== rx) {
      return isPalindrome(l + 1, r, xs) || isPalindrome(l, r - 1, xs)
    }
    l++
    r--
  }
  return true
}

const solve = solveCleaner
