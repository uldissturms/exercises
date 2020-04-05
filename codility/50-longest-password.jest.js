// [https://app.codility.com/demo/results/trainingYVP466-M92]

test('solve', () => {
  expect(solve('')).toEqual(-1)
  expect(solve('test')).toEqual(-1)
  expect(solve('zaq!2#edc')).toEqual(-1)
  expect(solve('test1')).toEqual(5)
  expect(solve('a2 test1')).toEqual(5)
  expect(solve('test 5 a0A pass007 ?xy1')).toEqual(7)
})

const solve = s => {
  const regex = /^[a-zA-Z0-9]+$/

  const isLetter = x => (x >= 'a' && x <= 'z') || (x >= 'A' && x <= 'Z')

  const isNumber = x => x >= '0' && x <= '9'

  const isValid = x =>
    regex.test(x) &&
    x.split('').filter(isLetter).length % 2 === 0 &&
    x.split('').filter(isNumber).length % 2 === 1

  const cs = s
    .split(' ')
    .filter(isValid)
    .map(x => x.length)

  if (cs.length === 0) {
    return -1
  }

  return Math.max(...cs)
}
