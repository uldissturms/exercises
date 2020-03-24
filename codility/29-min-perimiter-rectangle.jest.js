test('solve', () => {
  expect(solve(30)).toEqual(22)
  expect(solve(1)).toEqual(4)

  // max input
  expect(solve(1000000000)).toEqual(126500)
})

const solve = (x) => {
  const biggestMultipliers = (x) => {
    const root = Math.ceil(Math.sqrt(x))
    for (let i = root; i >= 1; i--) {
      if (x % i === 0) {
        return [i, (x / i)]
      }
    }
  }

  const [y, z] = biggestMultipliers(x)
  return (y + z) * 2
}
