// [https://app.codility.com/demo/results/trainingYEPV6T-G67]

test('solve', () => {
  expect(solve([-5, -3, -1, 0, 3, 6])).toEqual(5)
  expect(solve([])).toEqual(0)
  expect(solve([1])).toEqual(1)
  expect(solve([1, 2])).toEqual(2)
  expect(solve([1, 2, 3])).toEqual(3)
  expect(solve([-3, -2, -1])).toEqual(3)
  expect(solve([-3, -2, -1])).toEqual(3)
  expect(solve([0, 2, 2])).toEqual(2)
  expect(solve([-2, -2, 0])).toEqual(2)
})

const solve = (xs) => {
  let count = 0

  if (xs.length <= 1) {
    return xs.length
  }

  let sI = 0
  let eI = xs.length - 1

  while (sI <= eI) {
    const sV = xs[sI]
    const eV = xs[eI]

    if (Math.abs(sV) > Math.abs(eV)) {
      while (xs[sI] === sV) {
        sI++
      }
      count++
    } else if (Math.abs(eV) > Math.abs(sV)) {
      while (xs[eI] === eV) {
        eI--
      }
      count++
    } else {
      while (xs[sI] === sV) {
        sI++
      }
      while (xs[eI] === eV) {
        eI--
      }
      count++
    }
  }

  return count
}
