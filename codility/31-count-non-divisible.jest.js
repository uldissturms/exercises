test('solve', () => {
  expect(solve([3, 1, 2, 3, 6])).toEqual([2, 4, 3, 2, 0])
  expect(solve([1])).toEqual([0])
  expect(solve([1, 2])).toEqual([1, 0])
  expect(solve([1, 2, 3])).toEqual([2, 1, 1])
})

test('solve - large', () => {
  const size = 20000
  const res = solve(new Array(size).fill(0).map((_, i) => i))
  expect(res).toHaveLength(size)
})

// O(n^2)
const solveBF = (xs) => {
  return xs.map((x, i) => xs.filter((y, j) => i !== j && x % y !== 0).length)
}

// O(n * sqrt(n))
const solveSR = (xs) => {
  const len = xs.length
  const max = len * 2
  const counts = new Array(max).fill(0)

  for (const x of xs) {
    counts[x] = counts[x] + 1
  }

  const countFromFactors = (x) => {
    let count = 0
    let root = Math.floor(Math.sqrt(x))

    if (Math.pow(root, 2) === x) {
      count++
    } else {
      root++
    }

    for (i = 1; i < root; i++) {
      if (x % i === 0) {
        count += counts[i]
        count += counts[x / i]
      }
    }

    return count
  }

  return xs.map(x => len - countFromFactors(x))
}

const solve = solveSR
