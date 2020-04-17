// [https://leetcode.com/problems/number-of-islands]

const toString = (xs) => xs.map(x => x.map(y => y.toString()))

test('solve', () => {
  // empty
  expect(solve([[]])).toEqual(0)

  // single item
  expect(solve(toString([[0]]))).toEqual(0)
  expect(solve(toString([[1]]))).toEqual(1)

  // single row
  expect(solve(toString([[0, 0, 0]]))).toEqual(0)
  expect(solve(toString([[1, 0, 0]]))).toEqual(1)
  expect(solve(toString([[0, 1, 0]]))).toEqual(1)
  expect(solve(toString([[0, 0, 1]]))).toEqual(1)
  expect(solve(toString([[0, 1, 1]]))).toEqual(1)
  expect(solve(toString([[1, 1, 0]]))).toEqual(1)
  expect(solve(toString([[1, 1, 1]]))).toEqual(1)
  expect(solve(toString([[1, 0, 1]]))).toEqual(2)

  // multiple rows
  expect(solve(toString([
    [0, 0, 0],
    [0, 0, 0],
  ]))).toEqual(0)

  expect(solve(toString([
    [1, 0, 0],
    [1, 0, 0],
  ]))).toEqual(1)

  expect(solve(toString([
    [0, 1, 0],
    [0, 1, 0],
  ]))).toEqual(1)

  expect(solve(toString([
    [1, 1, 0],
    [1, 1, 0],
  ]))).toEqual(1)

  expect(solve(toString([
    [1, 0, 0],
    [0, 0, 1],
  ]))).toEqual(2)

  expect(solve(toString([
    [1, 0, 1],
    [0, 1, 0],
  ]))).toEqual(3)

  // examples
  expect(solve(toString([
    [1, 1, 1, 1, 0],
    [1, 1, 0, 1, 0],
    [1, 1, 0, 0, 0],
    [1, 1, 0, 0, 0],
  ]))).toEqual(1)

  expect(solve(toString([
    [1, 1, 0, 0, 0],
    [1, 1, 0, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 0, 1, 1],
  ]))).toEqual(3)
})

/*
for each cell
  if '1':
    increment counter
    expand island completely (replace with '.')
*/

const solve = (arr) => {
  const xs = [...arr]
  let count = 0

  const expand = (i, j) => {
    if (i < 0 || j < 0 || i >= xs.length || j >= xs[i].length) {
      return
    }

    const c = xs[i][j]
    if (c === '1') {
      xs[i][j] = '.'
      expand(i - 1, j) // top
      expand(i + 1, j) // bottom
      expand(i, j - 1) // left
      expand(i, j + 1) // right
    }
  }

  for (let i = 0; i < xs.length; i++) {
    for (let j = 0; j < xs[i].length; j++) {
      const c = xs[i][j]
      if (c === '1') {
        count++
        expand(i, j)
      }
    }
  }

  return count
}
