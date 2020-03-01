test('odd number', () => {
  expect(solve([1, 1, 2])).toBe(2)
  expect(solve([9, 3, 9, 3, 9, 7, 9])).toBe(7)
})

const solve = (xs) => {
  const m = new Map()
  for (const x of xs) {
    const c = m.has(x) ? m.get(x) : 0
    m.set(x, c + 1)
  }

  for (const [k, v] of m.entries()) {
    if (v % 2 === 1) {
      return k
    }
  }
}
