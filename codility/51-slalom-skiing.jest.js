// [https://app.codility.com/demo/results/trainingG7U5YH-QYW]

test('solve - recursively', () => {
  // simple
  expect(solve([1])).toEqual(1)
  expect(solve([1, 5])).toEqual(2)
  expect(solve([5, 1])).toEqual(2)
  expect(solve([1, 2, 3])).toEqual(3)

  // examples
  expect(solve([543, 123])).toEqual(2)
  expect(solve([10, 5, 7, 11, 6])).toEqual(4)
  expect(solve([1, 10, 4, 2, 7, 5, 9, 8, 6, 3])).toEqual(7)
  expect(solve([15, 13, 5, 7, 4, 10, 12, 8, 2, 11, 6, 9, 3])).toEqual(8)

  // medium
  // const mediumSize = 2000
  // expect(solve(new Array(mediumSize).fill(0).map((_, i) => i))).toEqual(mediumSize)
})


const D_L = 0
const D_R = 1

const opposite = d => d ^ D_R

const solveR = xs => {
  const len = xs.length
  const m = new Map()
  const keyFor = (...xs) => xs.join('_')

  const dp = (i, dL, d, l) => {
    if (i === len) {
      return 0
    }

    const k = keyFor(i, dL, d, l)
    if (m.has(k)) {
      return m.get(k)
    }

    const x = xs[i]
    const canTake = l == null || (d === D_L && l < x) || (d === D_R && l > x)

    const opts = [
      dp(i + 1, dL, d, l) // hold + skip
    ]

    if (canTake) {
      opts.push(
        dp(i + 1, dL, d, x) + 1 // hold + take
      )
      if (dL > 0) {
        opts.push(
          dp(i + 1, dL - 1, opposite(d), x) + 1 // change direction + take
        )
      }
    }

    const r = Math.max(...opts)
    const c = m.get(k)

    m.set(k, r)

    return r
  }

  return dp(0, 2, D_L)
}

const solveI = (xs) => {
}

const solve = solveR
