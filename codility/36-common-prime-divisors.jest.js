// [https://app.codility.com/demo/results/trainingXH6CFY-2JS]

const maxInt = Math.pow(2, 32)

test('solve', () => {
  expect(solve([1], [1])).toEqual(1)
  expect(solve([1], [3])).toEqual(0)
  expect(solve([1], [5])).toEqual(0)
  expect(solve([10], [30])).toEqual(0)

  expect(solve([15], [75])).toEqual(1)
  expect(solve([1, 15], [1, 75])).toEqual(2)
  expect(solve([1, 15], [3, 75])).toEqual(1)

  // example
  expect(solve([15, 10, 3], [75, 30, 5])).toEqual(1)

  // large input
  const maxSize = 6000
  expect(
    solve(
      new Array(maxSize).fill(maxInt),
      new Array(maxSize).fill(maxInt)
    )
  ).toEqual(maxSize)
})

test('checkFactors', () => {
  expect(checkFactors(1, 1)).toEqual(true)
  expect(checkFactors(2, 2)).toEqual(true)
  expect(checkFactors(2, 4)).toEqual(true)
  expect(checkFactors(2, 8)).toEqual(true)
  expect(checkFactors(4, 8)).toEqual(true)
  expect(checkFactors(1, 8)).toEqual(false)
  expect(checkFactors(6, 12)).toEqual(true)
  expect(checkFactors(6, 9)).toEqual(false)
  expect(checkFactors(10, 20)).toEqual(true)
  expect(checkFactors(10, 30)).toEqual(false)
  expect(checkFactors(1, 100)).toEqual(false)

  expect(checkFactors(15, 75)).toEqual(true)
  expect(checkFactors(75, 15)).toEqual(true)
  expect(checkFactors(10, 30)).toEqual(false)
  expect(checkFactors(5, 9)).toEqual(false)
  expect(checkFactors(9, 5)).toEqual(false)

  expect(checkFactors(12, 18)).toEqual(true)

  expect(checkFactors(1, maxInt)).toEqual(false)
  expect(checkFactors(maxInt, maxInt)).toEqual(true)
})

const solve = (xs, ys) => {
  let count = 0

  for (let i = 0; i < xs.length; i++) {
    const x = xs[i]
    const y = ys[i]

    if (checkFactors(x, y)) {
      count++
    }
  }

  return count
}

const sameFactors = (xs, ys) => {
  for (const k of xs.keys()) {
    if (!ys.has(k)) {
      return false
    }
  }

  for (const k of ys.keys()) {
    if (!xs.has(k)) {
      return false
    }
  }

  return true
}

const isProductOf = (denom, n) => {
  let x = n

  while (x !== 1) {
    const gcdX = gcd(denom, x)
    if (gcdX === 1) {
      return false
    }
    x = x / gcdX
  }

  return true
}

const checkFactors = (x, y) => {
  if (x === y) {
    return true
  }

  const denom = gcd(x, y)

  if (!isProductOf(denom, x)) {
    return false
  }

  if (!isProductOf(denom, y)) {
    return false
  }

  return true
}

const gcdDiv = (x, y) => {
  if (x % y === 0) {
    return y
  }

  return gcdDiv(y, x % y)
}

const gcd = gcdDiv
