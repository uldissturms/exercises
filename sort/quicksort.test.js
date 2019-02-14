import test from 'ava'

test('sort items', t => {
  t.deepEqual(quicksort([3, 2, 1]), [1, 2, 3])
  t.deepEqual(quicksort([3, 2, 1]), [1, 2, 3])
  t.deepEqual(quicksort([1, 2, 3]), [1, 2, 3])
  t.deepEqual(quicksort(['c', 'a', 'b']), ['a', 'b', 'c'])
  t.deepEqual(quicksort(['b', 'c', 'a']), ['a', 'b', 'c'])
  t.deepEqual(quicksort(['a', 'b', 'c']), ['a', 'b', 'c'])
})

test('sort items - duplicates', t => {
  t.deepEqual(quicksort([3, 2, 2, 1]), [1, 2, 2, 3])
})

const quicksort = (arr) => {
  if (arr.length === 0) {
    return []
  }

  if (arr.length === 1) {
    return arr
  }

  const middle = Math.floor(arr.length / 2)
  const pivot = arr[middle]
  const smaller = arr.filter(x => x < pivot)
  const bigger = arr.filter((x, idx) => x >= pivot && idx !== middle)
  return [
    ...quicksort(smaller),
    pivot,
    ...quicksort(bigger)
  ]
}
