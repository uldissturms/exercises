import test from 'ava'

test('merge two arrays', t => {
  const x = [1, 3, 5, 8, 10]
  const y = [2, 4, 6]
  t.deepEqual(merge(x, y), [1, 2, 3, 4, 5, 6, 8, 10])
})

test('merge two arrays - edge cases', t => {
  t.deepEqual(merge([1], []), [1])
  t.deepEqual(merge([], []), [])
})

const merge = (a, b) => {
  const res = []
  let aIdx = 0
  let bIdx = 0

  while (aIdx < a.length && bIdx < b.length) {
    const aV = a[aIdx]
    const bV = b[bIdx]
    if (aV < bV) {
      res.push(aV)
      aIdx++
    } else {
      res.push(bV)
      bIdx++
    }
  }

  return res
    .concat(a.slice(aIdx))
    .concat(b.slice(bIdx))
}
