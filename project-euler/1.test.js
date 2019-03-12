import test from 'ava'

test('sum of all multiples of 3 or 5', t => {
  t.is(solve(10), 23)
  t.is(solve(1000), 233168)
})

const solve = (below) => {
  let sum = 0
  for (let i = 0; i < below; i++) {
    if (i % 3 === 0 || i % 5 === 0) {
      sum += i
    }
  }
  return sum
}
