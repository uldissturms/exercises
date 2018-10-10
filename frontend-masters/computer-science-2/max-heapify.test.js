import test from 'ava'

test('heapifies array', t => {
  t.deepEqual(heapify([2, 4, 1], 0), [4, 2, 1])
  t.deepEqual(heapify([1, 2], 0), [2, 1])
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
const maxChild = (a, i) => {
  const li = leftChild(i)
  const ri = rightChild(i)

  if (li >= a.length) {
    return []
  }

  if (ri >= a.length) {
    return [li, a[li]]
  }

  if (a[li] > a[ri]) {
    return [li, a[li]]
  }

  return [ri, a[ri]]
}
const swap = (a, l, r) => {
  const t = a[l]
  a[l] = a[r]
  a[r] = t
}

// O(log n)
const heapify = (a, i) => {
  const [ci, cv] = maxChild(a, i)
  if (cv > a[i]) {
    swap(a, i, ci)
    heapify(a, ci)
  }
  return a
}

// O(n)
const buildHeap = a => {
  for (let i = Math.floor(a.length / 2); i >= 0; i--) {
    heapify(a, i)
  }
  return a
}

// O(n log n)
const heapSort = a => {
  const o = []

  buildHeap(a)

  for (let i = a.length - 1; i >= 0; i--) {
    o.unshift(a[0])
    swap(a, 0, i)
    a.pop()
    heapify(a, 0)
  }

  return o
}
