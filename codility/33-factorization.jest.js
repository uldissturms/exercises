// [https://codility.com/media/train/9-Sieve.pdf]

test('solve', () => {
  expect(factorize(8)).toEqual([2, 2, 2])
})

const arrayF = (n) => {
  const F = new Array(n + 1).fill(0)
  let i = 2
  while (i * i <= n) {
    if (F[i] === 0) {
      let k = i * i
      while (k <= n) {
        if (F[k] === 0) {
          F[k] = i
        }
        k += i
      }
    }
    i++
  }
  return F
}

const factorize = (n) => {
  const F = arrayF(n)
  const factors = []
  let x = n
  while (F[x] > 0) {
    const factor = F[x]
    x /= factor
    factors.push(factor)
  }
  factors.push(x)
  return factors
}
