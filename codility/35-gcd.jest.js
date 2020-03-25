// [https://codility.com/media/train/10-Gcd.pdf]

test('solve', () => {
  expect(gcd(10, 2)).toEqual(2)
  expect(gcd(10, 5)).toEqual(5)
  expect(gcd(100, 1)).toEqual(1)
  expect(gcd(1, 1)).toEqual(1)
  expect(gcd(2, 2)).toEqual(2)
  expect(gcd(3, 3)).toEqual(3)
  expect(gcd(6, 9)).toEqual(3)
})

// O(n)
const gcdDiff = (x, y) => {
  if (x === y) {
    return x
  }

  return x > y ? gcdDiff(x - y, y) : gcdDiff(x, y - x)
}

// O(log(n+m))
const gcdDiv = (x, y) => {
  if (x % y === 0) {
    return y
  }

  return gcdDiv(y, x % y)
}


const gcd = gcdDiv
