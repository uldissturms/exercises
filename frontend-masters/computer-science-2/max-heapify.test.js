import test from 'ava'

test('heapifies array', t => {
  t.deepEqual(heapify([2, 4, 1]), [4, 2, 1])
  t.deepEqual(heapify([1, 2]), [2, 1])
})

test('build max heap', t => {
  t.deepEqual(buildHeap(
    [16, 4, 10, 14, 7, 9, 3, 2, 8, 1]
  ),
    [16, 14, 10, 8, 7, 9, 3, 2, 4, 1]
  )
})

test('heapsort', t => {
  t.deepEqual(heapSort(
    [2, 4, 1]
  ),
    [1, 2, 4]
  )
  t.deepEqual(heapSort(
    [16, 4, 10, 14, 7, 9, 3, 2, 8, 1]
  ),
    [1, 2, 3, 4, 7, 8, 9, 10, 14, 16]
  )
})

const leftChild = i =>
  i * 2 + 1
const rightChild = i =>
  i * 2 + 2
const maxChild = (a, i, s) => {
  const li = leftChild(i)
  const ri = rightChild(i)

  if (li >= s) {
    return []
  }

  if (ri >= s) {
    return [li, a[li]]
  }

  return a[li] > a[ri] ? [li, a[li]] : [ri, a[ri]]
}
const swap = (a, l, r) => {
  const t = a[l]
  a[l] = a[r]
  a[r] = t
}

const isNotUndefined = x =>
  typeof x !== 'undefined'

// O(log n)
const heapify = (a, i = 0, s = a.length) => {
  const [ci, cv] = maxChild(a, i, s)
  if (isNotUndefined(ci) && cv > a[i]) {
    swap(a, i, ci)
    heapify(a, ci, s)
  }
  return a
}

// O(n)
const buildHeap = a => {
  for (let i = Math.floor(a.length / 2); i >= 0; i--) {
    heapify(a, i, a.length)
  }
  return a
}

// O(n log n)
const heapSort = a => {
  let heapSize = a.length

  a = buildHeap(a)

  for (let i = heapSize - 1; i >= 0; i--) {
    heapSize--
    swap(a, 0, i)
    heapify(a, 0, heapSize)
  }

  return a
}
