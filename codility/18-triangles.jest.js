/*

[10, 2, 5, 1, 8, 20]

[1, 2, 5, 8, 10, 20]
^   ^  ^
a   b  c

head 5
tail 10

// handle negative cases

*/

/*

intuition:

ignore negative and zero values
sort the array
for each index check if what we have in next positions is a valid triangle

*/

test('solve', () => {
  expect(solve([])).toEqual(0)
  expect(solve([1])).toEqual(0)
  expect(solve([1, 2])).toEqual(0)
  expect(solve([1, 2, 2])).toEqual(1)
  expect(solve([2, 2, 1])).toEqual(1)
  expect(solve([10, 2, 5, 1, 8, 20])).toEqual(1)
})

const isTriangle = (a, b, c) => a + b > c && b + c > a && c + a > b

const solve = (xs) => {
  if (xs.length < 3) {
    return 0
  }

  const sorted = xs.filter(x => x > 0).sort((x, y) => x - y)
  for (let i = 0; i < sorted.length - 2; i++) {
    const a = sorted[i]
    const b = sorted[i + 1]
    const c = sorted[i + 2]
    if (isTriangle(a, b, c)) {
      return 1
    }
  }

  return 0
}
