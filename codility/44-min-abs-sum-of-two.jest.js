// [https://app.codility.com/demo/results/trainingGT9J2X-DHN]

const maxNum = 100000

test('solve', () => {
  // all positive
  expect(solve([1, 2, 3])).toEqual(2)

  // all negative
  expect(solve([-3, -2, -1])).toEqual(2)

  // mix of positive and negative
  expect(solve([-3, 1, 2])).toEqual(1)

  // min value of 0
  expect(solve([-2, 1, 2, 0, 4])).toEqual(0)

  // example
  expect(solve([1, 4, -3])).toEqual(1)
  expect(solve([-8, 4, 5, -10, 3])).toEqual(3)
  expect(solve([-4, -4, -2, 2, 3, 8, 8])).toEqual(0)

  // large
  let input = new Array(maxNum).fill(0).map(x => random(1, maxNum))
  input[random(0, maxNum - 1)] = 0
  expect(solve(input)).toEqual(0)
})

const random = (s, e) =>
  Math.ceil(Math.random() * (e - s)) + s

const solve = (ns) => {
  const xs = [...ns].sort((x, y) => x - y)

  const len = xs.length

  let bI = 0
  let fI = len - 1
  let res = Infinity

  while (bI <= fI) {
    const b = xs[bI]
    const f = xs[fI]

    res = Math.min(res, Math.abs(b + f))

    if (Math.abs(b) > Math.abs(f)) {
      bI++
    } else {
      fI--
    }
  }

  return res
}
