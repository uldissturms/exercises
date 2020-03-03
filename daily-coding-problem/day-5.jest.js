test('car', () => {
  expect(car(cons(3, 4))).toEqual(3)
})

test('cdr', () => {
  expect(cdr(cons(3, 4))).toEqual(4)
})

const cons = (a, b) => {
  return (f) => f(a, b)
}

const car = f => f((x) => x)
const cdr = f => f((x, y) => y)
