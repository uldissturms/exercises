test('solve', () => {
  // no peaks
  expect(solve([1])).toEqual(0)
  expect(solve([1, 2])).toEqual(0)
  expect(solve([1, 2, 3])).toEqual(0)

  // simple peaks
  expect(solve([0, 1, 0])).toEqual(1)

  expect(solve([0, 1, 0, 0, 1, 0])).toEqual(2)

  // non uniform blocks
  expect(solve([0, 1, 0, 1, 0])).toEqual(1)

  // every second peak
  expect(solve([0, 1, 0, 1, 0, 1, 0, 1, 0])).toEqual(3)

  // example
  expect(solve([1, 2, 3, 4, 3, 4, 1, 2, 3, 4, 6, 2])).toEqual(3)

  // 10 in 2 splits (k = 5)
  expect(solve([0, 1, 0, 1, 0, 1, 0, 1, 0, 0])).toEqual(2)

  // 12 in 4 splits (k = 3)
  expect(solve([0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0])).toEqual(4)
})

const solve = xs => {
  const isPeak = (i, xs) =>
    i > 0 && i < xs.length - 1 && xs[i] > xs[i - 1] && xs[i] > xs[i + 1]

  const getPeaks = xs => {
    const ps = new Array(xs.length).fill(0)
    let peaksSoFar = 0
    for (let i = 0; i < xs.length; i++) {
      if (isPeak(i, xs)) {
        peaksSoFar++
      }
      ps[i] = peaksSoFar
    }
    return ps
  }

  const peaks = getPeaks(xs)
  const peakCount = peaks[peaks.length - 1]

  if (peakCount < 2) {
    return peakCount
  }

  const multipliersFor = x => {
    const root = Math.ceil(Math.sqrt(x))
    const ms = new Set([1, x])

    for (let i = 2; i <= root; i++) {
      if (x % i === 0) {
        ms.add(i)
        ms.add(x / i)
      }
    }

    return Array.from(ms).sort((x, y) => x - y)
  }

  const ms = multipliersFor(xs.length)
    .filter(
    x => x >= Math.ceil(xs.length / peakCount)
  )

  const canSplit = k => {
    for (let i = 0; i < xs.length; i += k) {
      const j = i + k - 1
      const diff = peaks[j] - (peaks[i - 1] || 0)
      if (diff < 1) {
        return false
      }
    }

    return true
  }

  const bs = (sI, eI) => {
    const mI = Math.floor((sI + eI) / 2)
    const mV = ms[mI]
    const sV = ms[sI]

    if (canSplit(sV)) {
      return sV
    }

    if (sI + 1 === eI) {
      return ms[eI]
    }

    if (canSplit(mV)) {
      return bs(sI, mI)
    }

    return bs(mI + 1, eI)
  }

  const smallestK = bs(0, ms.length - 1)

  return xs.length / smallestK
}
