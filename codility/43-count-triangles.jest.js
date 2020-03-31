// [https://app.codility.com/demo/results/trainingVENTDB-W4G]

test('solve', () => {
  expect(solve([10, 2, 5, 1, 8, 12])).toEqual(4)
})

const solve = (ns) => {
  const xs = [...ns].sort((x, y) => x - y)

  const len = xs.length
  let count = 0

  for (let i = 0; i < len; i++) {
    const x = xs[i]
    let k = i + 2
    for (let j = i + 1; j < len; j++) {
      const y = xs[j]

      while (k < len && x + y > xs[k]) {
        k++
      }

      count += k - j - 1
    }
  }

  return count
}
