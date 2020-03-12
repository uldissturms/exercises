test('solve', () => {
  const pi = solve(100000)
  expect(pi).toBeGreaterThanOrEqual(3.13)
  expect(pi).toBeLessThanOrEqual(3.15)
})

const solve = (iterations) => {
  let pointsInsideCircle = 0
  let pointsInsideSquare = 0

  for (let i = 0; i < iterations; i++) {
    const x = Math.random()
    const y = Math.random()
    const d = (x ** 2) + (y ** 2)
    if (d <= 1) {
      pointsInsideCircle++
    }
    pointsInsideSquare++
  }

  return 4 * (pointsInsideCircle / pointsInsideSquare)
}
