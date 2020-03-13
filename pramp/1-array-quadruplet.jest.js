const clone = x => JSON.parse(JSON.stringify(x))

const solve = (arr, s) => {
  if (arr.length < 4) {
    return []
  }

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
        const fth = dst[eIdx]

        const sum = trd + fth

        if (sum === threshold) {
          return [fst, snd, trd, fth]
        }

        if (sum > threshold) {
          eIdx--
        } else {
          sIdx++
        }
      }
    }
  }

  return []
}

test('solve', () => {
  expect(solve([], 1)).toEqual([])
  expect(solve([1, 1, 1], 3)).toEqual([])
  expect(solve([1, 1, 1, 2], 6)).toEqual([])
  expect(solve([1, 2, 3, 4], 120)).toEqual([])
  expect(solve([2, 7, 4, 0, 9, 5, 1, 3], 20)).toEqual([0, 4, 7, 9])
  expect(solve([1, 2, 3, 4, 5, 9, 19, 12, 12, 19], 40)).toEqual([4, 5, 12, 19])
})
