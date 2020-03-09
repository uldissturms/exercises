/*
manually:

(()(())())

input: (()(())())
stack:

*/

/*
steps:
1. init stack of opening brackets
2. for each position
  add item to stack if opening bracket
  if stack empty and closing bracket return 0
  remove item from stack if closing bracket
3. return 1 if stack is empty 0 otherwise
*/

test('solve', () => {
  // valid
  expect(solve('')).toEqual(1)
  expect(solve('()')).toEqual(1)
  expect(solve('()()')).toEqual(1)
  expect(solve('(())')).toEqual(1)
  expect(solve('(()(())())')).toEqual(1)

  // invalid
  expect(solve('(')).toEqual(0)
  expect(solve(')')).toEqual(0)
  expect(solve('(()')).toEqual(0)
  expect(solve('())')).toEqual(0)
})

const solve = xs => {
  const open = []

  for (const x of xs) {
    if (x === '(') {
      open.push(1)
    } else {
      if (open.length === 0) {
        return 0
      } else {
        open.pop()
      }
    }
  }

  return open.length === 0 ? 1 : 0
}
