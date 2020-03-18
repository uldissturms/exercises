// [https://leetcode.com/problems/reverse-string]

test('solve - one', () => {
  const input = ['h', 'e', 'l', 'l', 'o']
  solve(input)
  const output = ['o', 'l', 'l', 'e', 'h']
  expect(input).toEqual(output)
})

test('solve - two', () => {
  const input = ["H","a","n","n","a","h"]
  solve(input)
  const output = ["h","a","n","n","a","H"]
  expect(input).toEqual(output)
})

const solve = (x) => reverseInPlace(0, x.length - 1, x)

const reverseInPlace = (i, j, arr) => {
  while (i < j) {
    const tmp = arr[i]
    arr[i] = arr[j]
    arr[j] = tmp
    i++
    j--
  }
}
