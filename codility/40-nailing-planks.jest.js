// [https://app.codility.com/demo/results/trainingXH7QXZ-CYZ]

test('solve', () => {
  expect(solve([2], [2], [1])).toEqual(-1) // nail outside bounds
  expect(solve([1], [1], [1])).toEqual(1) // nail is a point
  expect(solve([1, 4, 5, 8], [4, 5, 9, 10], [4, 6, 7, 10, 2])).toEqual(4)
})

const maxNum = 30000

test('solve - large - last nail planks all', () => {
  expect(
    solve(new Array(maxNum).fill(1), new Array(maxNum).fill(maxNum), [
      ...new Array(maxNum - 1).fill(0),
      1
    ])
  ).toEqual(maxNum)
})

test('solve - large - first nail planks all', () => {
  expect(
    solve(new Array(maxNum).fill(1), new Array(maxNum).fill(maxNum), [
      1,
      ...new Array(maxNum - 1).fill(0),
    ])
  ).toEqual(1)
})

const solve = (as, bs, cs) => {
  const len = as.length

  const valid = (v) => {
    const ns = cs.slice(0, v).sort((x, y) => x - y)
    for (let i = 0; i < len; i++) {
      if (!findNailFor(as[i], bs[i], ns)) {
        return false
      }
    }
    return true
  }

  const findNailFor = (s, e, ns) => {
    let lower = 0
    let upper = ns.length - 1

    while (lower <= upper) {
      const mid = Math.floor((lower + upper) / 2)
      const midV = ns[mid]

      if (midV >= s && midV <= e) {
        return true
      }

      if (midV > e) {
        upper = mid - 1
      } else {
        lower = mid + 1
      }
    }

    return false
  }

  const binSearch = (s, e, p) => {
    let lower = s
    let upper = e

    while (lower <= upper) {
      const mid = Math.floor((lower + upper) / 2)
      if (p(mid)) {
        upper = mid - 1
      } else {
        lower = mid + 1
      }
    }

    return lower
  }

  const res = binSearch(1, cs.length, x => valid(x))

  return res > len ? -1 : res
}
