const clone = x => JSON.parse(JSON.stringify(x))

const solve = (arr, s) => {
  if (arr.length < 4) {
    return []
  }

  const keys = new Set()
  const res = []

  const dst = clone(arr).sort((x, y) => x - y)

  for (let i = 0; i < dst.length - 2; i++) {
    const fst = dst[i]
    for (let j = i + 1; j < dst.length - 1; j++) {
      const snd = dst[j]
      const threshold = s - (fst + snd)

      let sIdx = j + 1
      let eIdx = dst.length - 1

      while (sIdx < eIdx) {
        const trd = dst[sIdx]
        const afterTrd = dst[sIdx + 1]
        const fth = dst[eIdx]
        const beforeFth = dst[eIdx - 1]

        const sum = trd + fth

        if (sum > threshold) {
          eIdx--
        } else if (sum < threshold) {
          sIdx++
        } else {
          const candidate = [fst, snd, trd, fth]
          const key = toKey(candidate)
          if (!keys.has(key)) {
            res.push(candidate)
            keys.add(key)
          }
          sIdx++
          eIdx--
        }
      }
    }
  }

  return res
}

const toKey = (xs) => xs.join('_')

test('solve', () => {
  expect(solve([-4, -3, -2, -1, 0, 0, 1, 2, 3, 4], 0)).toEqual([
    [-4, -3, 3, 4],
    [-4, -2, 2, 4],
    [-4, -1, 1, 4],
    [-4, -1, 2, 3],
    [-4, 0, 0, 4],
    [-4, 0, 1, 3],
    [-3, -2, 1, 4],
    [-3, -2, 2, 3],
    [-3, -1, 0, 4],
    [-3, -1, 1, 3],
    [-3, 0, 0, 3],
    [-3, 0, 1, 2],
    [-2, -1, 0, 3],
    [-2, -1, 1, 2],
    [-2, 0, 0, 2],
    [-1, 0, 0, 1]
  ])
  expect(
    solve([-3, -2, -1, 0, 0, 1, 2, 3], 0)
  ).toEqual([
    [-3, -2, 2, 3],
    [-3, -1, 1, 3],
    [-3, 0, 0, 3],
    [-3, 0, 1, 2],
    [-2, -1, 0, 3],
    [-2, -1, 1, 2],
    [-2, 0, 0, 2],
    [-1, 0, 0, 1]
  ])
})
