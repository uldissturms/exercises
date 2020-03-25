test('solve', () => {
  expect(solve([1])).toEqual([0])
  expect(solve([1, 2])).toEqual([1, 0])
  expect(solve([3, 4])).toEqual([1, 1])
  expect(solve([2])).toEqual([0])
  expect(solve([1, 2, 3])).toEqual([2, 1, 1])

  // example
  expect(solve([3, 1, 2, 3, 6])).toEqual([2, 4, 3, 2, 0])
})

test('solve - large', () => {
  const size = 50000
  const res = solve(new Array(size).fill(0).map((_, i) => i))
  expect(res).toHaveLength(size)
})

// O(n^2)
const solveBF = (xs) => {
  return xs.map((x, i) => xs.filter((y, j) => i !== j && x % y !== 0).length)
}

const countOccurrences = (xs) => {
  const counts = new Array((xs.length * 2) + 1).fill(0)

  for (const x of xs) {
    counts[x] = counts[x] + 1
  }

  return counts
}

const countFromFactors = (x, counts) => {
  let count = 0
  let root = Math.floor(Math.sqrt(x))

  if (Math.pow(root, 2) === x) {
    count += counts[root]
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

// O(n * sqrt(n))
const solveSR = (xs) => {
  const counts = countOccurrences(xs)
  return xs.map(x => xs.length - countFromFactors(x, counts))
}

// O(n * log(n))
const solveLg = (xs) => {
  const counts = countOccurrences(xs)
  const max = xs.length * 2
  const sieve = new Array(max + 1).fill(0)

  for (let i = 1; i <= max; i++) {
    const n = counts[i]
    if (n !== 0) {
      for (j = i; j <= max; j += i) {
        sieve[j] -= n
      }
    }
  }

  return xs.map(x => xs.length + sieve[x])
}

const solve = solveLg
