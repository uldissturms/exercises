// [https://leetcode.com/problems/remove-invalid-parentheses]

test('solve', () => {
  // basic
  expect(solve(')(')).toEqual([''])
  expect(solve('()')).toEqual(['()'])

  // extra bracket on each side
  expect(solve('(()')).toEqual(['()'])
  expect(solve('())')).toEqual(['()'])

  // extra brackets on each side
  expect(solve('((()')).toEqual(['()'])
  expect(solve('()))')).toEqual(['()'])

  // multiple ways to remove brackets
  expect(solve('((())')).toEqual(['(())'])
  expect(solve('(()))')).toEqual(['(())'])

  // examples
  expect(solve('()())()')).toEqual(['(())()', '()()()'])
  expect(solve('(a)())()')).toEqual(['(a())()', '(a)()()'])
})

test('invalid', () => {
  expect(invalid('')).toEqual([0, 0])
  expect(invalid('()')).toEqual([0, 0])
  expect(invalid('()()')).toEqual([0, 0])
  expect(invalid('(())')).toEqual([0, 0])
  expect(invalid('(())()')).toEqual([0, 0])

  expect(invalid('(')).toEqual([1, 0])
  expect(invalid(')')).toEqual([0, 1])
  expect(invalid(')(')).toEqual([1, 1])
  expect(invalid(')((')).toEqual([2, 1])
  expect(invalid('))(')).toEqual([1, 2])
})

const invalid = xs => {
  let c = 0
  let o = 0

  for (const x of xs) {
    if (x === '(') {
      o++
    } else if (x === ')') {
      if (o > 0) {
        o--
      } else {
        c++
      }
    }
  }

  return [o, c]
}

const valid = xs => {
  const [o, c] = invalid(xs)
  return o === 0 && c === 0
}

const solve = s => {
  const xs = s.split('')
  const len = xs.length
  const [oL, cL] = invalid(xs)
  const res = new Set()

  const dfs = (i, o, c) => {
    if (o === 0 && c === 0) {
      if (valid(xs)) {
        res.add(xs.filter(x => x !== '.').join(''))
      }

      return
    }

    if (i === len) {
      return
    }

    const x = xs[i]

    if (o > 0 && x === '(') {
      xs[i] = '.'
      dfs(i + 1, o - 1, c) // skip (
      xs[i] = x
    }

    if (c > 0 && x === ')') {
      xs[i] = '.'
      dfs(i + 1, o, c - 1) // skip )
      xs[i] = x
    }

    dfs(i + 1, o, c) // leave
  }

  dfs(0, oL, cL)

  return Array.from(res)
}

/*
(a)())()

(a)()()
(a())()

    01234567
xs: (a)())()
len: 8
oL: 0
cL: 1
s: [(a())(), (a)()()]

dfs(0, 0, 1)
  x: (
  dfs(1, 0, 1)
    x: a
    dfs(2, 0, 1)
      x: )
      dfs(3, 0, 0) // valid -> add
      dfs(3, 0, 1)
        x: (
        dfs(4, 0, 1)
          x: )
          dfs(5, 0, 0) // valid -> add
          dfs(5, 0, 1)
            x: )
            dfs(6, 0, 0) // valid -> add
            dfs(6, 0, 1)
              x: (
              dfs(7, 0, 1)
                x: )
                dfs(8, 0, 0) // invalid -> don't add

*/

/*


* find the number incorrect ( and )
* at every index
  if incorrect number of ( and ) is zero
    add modified string to result if it's valid
    backtrack
  if count of incorrect ( is > 0 and c == (
    skip c
    leave c
  if count of incorrect ) is > 0 and c == )
    skip c
    leave c

*/
