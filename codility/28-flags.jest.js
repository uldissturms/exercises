// official solution: [https://codility.com/media/train/solution-flags.pdf]

test('solve', () => {
  // no peaks
  expect(solve([1])).toEqual(0)
  expect(solve([1, 2])).toEqual(0)
  expect(solve([1, 2, 3])).toEqual(0)

  // simple
  expect(solve([1, 2, 1])).toEqual(1)
  expect(solve([1, 2, 1, 2, 1])).toEqual(2)

  // not a peak if array ends with it
  expect(solve([1, 2, 1, 2])).toEqual(1)

  expect(solve([1, 5, 3, 4, 3, 4, 1, 2, 3, 4, 6, 2])).toEqual(3)

  const p = 2
  const v = 1
  const space = 3
  const vs = new Array(space).fill(v)

  expect(solve([v, p, ...vs, p, ...vs, p, ...vs, p, v])).toEqual(4)
})

const solve = xs => {
  const peaks = xs
    .map((x, i) => [i, x])
    .filter(
      ([i, x]) => i > 0 && i < xs.length - 1 && xs[i - 1] < x && x > xs[i + 1]
    )
    .map(([i]) => i)

  const len = peaks.length

  if (len < 2) {
    return len
  }

  const canPut = (k) => {
    let curIdx = 1
    let prevIdx = 0

    let curK = 1 // always flag first peak

    while (curIdx < peaks.length) {
      const cur = peaks[curIdx]
      const prev = peaks[prevIdx]

      if (cur - prev >= k) {
        curK++
        prevIdx = curIdx
      }

      curIdx++

      if (curK === k) {
        return true
      }
    }

    return curK === k
  }

  const bs = (start, end) => {
    const middle = Math.floor((start + end) / 2)

    if (canPut(end)) {
      return end
    }

    if (start + 1 === end) {
      return start
    }

    if (canPut(middle)) {
      return bs(middle, end)
    }

    return bs(start, middle - 1)
  }

  return bs(2, Math.ceil(Math.sqrt(xs.length)))
}
