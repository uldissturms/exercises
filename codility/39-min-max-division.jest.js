// [https://app.codility.com/demo/results/trainingUVWYTN-RQW]

test('solve', () => {
  expect(solve(3, 5, [2, 1, 5, 1, 2, 2, 2])).toEqual(6)
})

const solve = (k, m, xs) => {
  const max = Math.max(...xs)
  const sum = xs.reduce((x, y) => x + y)

  if (k === 1) {
    return sum
  }

  if (k >= xs.length) {
    return max
  }

  const valid = (v) => {
    let sum = 0
    let count = 0

    for (const x of xs) {
      if (sum + x > v) {
        sum = x
        count += 1
      } else {
        sum += x
      }

      if (count >= k) {
        return false
      }
    }

    return true
  }

  let lower = max
  let upper = sum

  const bs = () => {
    while (lower <= upper) {
      mid = Math.floor((lower + upper) / 2)
      if (valid(mid)) {
        upper = mid - 1
      } else {
        lower = mid + 1
      }
    }

    return lower
  }

  return bs()
}
