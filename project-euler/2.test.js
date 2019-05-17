import test from 'ava'

test('even fibonacci numbers', t => {
  t.is(solve(5), 2)
  t.is(solve(4000000), 4613732)
})

const solve = (notAbove) => {
  let sum = 0

  let twoBehind = 0
  let oneBehind = 1
  let current = 0

  while (true) {
    current = twoBehind + oneBehind

    if (current > notAbove) {
      return sum
    }

    if (current % 2 === 0) {
      sum += current
    }

    twoBehind = oneBehind
    oneBehind = current
  }
}
