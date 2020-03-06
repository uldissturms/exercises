/*
intersecting disks
*/

test('solve', () => {
  expect(solve([1])).toEqual(0)
  expect(solve([0])).toEqual(0)
  expect(solve([0, 0])).toEqual(0)
  expect(solve([1, 1])).toEqual(1)
  expect(solve([1, 1, 1])).toEqual(3)
  expect(solve([1, 1, 0])).toEqual(2)
  expect(solve([0, 1, 1])).toEqual(2)
  expect(solve([1, 5, 2, 1, 4, 0])).toEqual(11)
})

test('bisect', () => {
  expect(bisectRight([1, 2, 3], 2)).toEqual(2)
})

const byStartAndEnd = ([xStart, xEnd], [yStart, yEnd]) => {
  const diffStart = xStart - yStart
  if (diffStart === 0) {
    return xEnd - yEnd
  }
  return diffStart
}

// based off answer on this thread: https://stackoverflow.com/questions/4801242/algorithm-to-calculate-number-of-intersecting-discs/27549852
const solve = xs => {
  let pairs = 0
  const intervals = xs.map((x, i) => [i - xs[i], i + xs[i]]).sort(byStartAndEnd)
  const starts = intervals.map(([x]) => x)
  for (let i = 0; i < starts.length; i++) {
    const [start, end] = intervals[i]
    // 1. disks started before disk i ends
    // 2. substract all disks that started before this index
    // 3. substract the current disk from counter
    // notes: 1 and 2 makes sure we only count overlaps on the left side
    // started before the current disc but center is at i + n, where n >= 0
    const count = bisectRight(starts, end) - i - 1
    pairs += count
    if (pairs > 10000000) {
      return -1
    }
  }

  return pairs
}

// copied from https://github.com/python/cpython/blob/3.8/Lib/bisect.py
const bisectRight = (a, x, lo = 0, hi = a.length) => {
  if (lo < 0) throw new ValueError('lo must be non-negative')

  while (lo < hi) {
    const mid = ((lo + hi) / 2) | 0

    if (x < a[mid]) hi = mid
    else lo = mid + 1
  }

  return lo
}
