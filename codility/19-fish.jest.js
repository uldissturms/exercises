/*
edge cases:
1. all 0 direction
2. all 1 direction
*/

const UPSTREAM = 0 // <-
const DOWNSTREAM = 1 // ->

const solve = (as, bs) => {
  const ds = []
  let alive = as.length

  for (let i = 0; i < as.length; i++) {
    const cur = as[i]
    const dir = bs[i]
    if (dir === DOWNSTREAM) { // downstream fish
      ds.push(cur)
    } else { // upstream fish
      while (ds.length > 0) {
        const val = ds[ds.length - 1]
        if (val > cur) {
          alive--
          break
        } else {
          alive--
          ds.pop()
        }
      }
    }
  }

  return alive
}

test('solve', () => {
  // no items
  expect(solve([], [])).toEqual(0)

  // single item
  expect(solve([1], [0])).toEqual(1)

  // same direction
  expect(solve([1, 2], [0, 0])).toEqual(2)
  expect(solve([1, 2], [1, 1])).toEqual(2)

  // opposite direction
  expect(solve([1, 2], [1, 0])).toEqual(1)
  expect(solve([1, 2, 3], [1, 0, 0])).toEqual(2)
  expect(solve([1, 2, 3], [1, 1, 0])).toEqual(1)
  expect(solve([1, 2, 3], [0, 0, 1])).toEqual(3)
  expect(solve([1, 2], [0, 1])).toEqual(2)

  // example
  expect(solve([4, 3, 2, 1, 5], [0, 1, 0, 0, 0])).toBe(2)
})
