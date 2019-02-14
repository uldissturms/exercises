import test from 'ava'

test('sort items', t => {
  t.deepEqual(mergesort([3, 2, 1]), [1, 2, 3])
  t.deepEqual(mergesort([3, 2, 1]), [1, 2, 3])
  t.deepEqual(mergesort([1, 2, 3]), [1, 2, 3])
  t.deepEqual(mergesort(['c', 'a', 'b']), ['a', 'b', 'c'])
  t.deepEqual(mergesort(['b', 'c', 'a']), ['a', 'b', 'c'])
  t.deepEqual(mergesort(['a', 'b', 'c']), ['a', 'b', 'c'])
})

test('sort items - duplicates', t => {
  t.deepEqual(mergesort([3, 2, 2, 1]), [1, 2, 2, 3])
})

const mergesort = (arr) => {
  if (arr.length === 0) {
    return []
  }

  if (arr.length === 1) {
    return arr
  }

  const middle = Math.floor(arr.length / 2)

  const left = mergesort(arr.slice(0, middle))
  const right = mergesort(arr.slice(middle))

  return merge(left, right)
}

const merge = (left, right) => {
  if (left.length === 0) {
    return right
  }

  if (right.length === 0) {
    return left
  }

  let lIdx = 0
  let rIdx = 0

  const res = []

  while (lIdx < left.length || rIdx < right.length) {
    const l = left[lIdx]
    const r = right[rIdx]

    if (lIdx === left.length) {
      rIdx++
      res.push(r)
      continue
    }

    if (rIdx === right.length) {
      lIdx++
      res.push(l)
      continue
    }

    if (l <= r) {
      lIdx++
      res.push(l)
    } else {
      rIdx++
      res.push(r)
    }
  }

  return res
}
