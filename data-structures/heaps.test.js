import test from 'ava'
import {MinHeap, MaxHeap} from './heaps'

test('min heap returns item in ascending order', t => {
  returnsInOrder(t, MinHeap.heapify([1, 2, 3]), [1, 2, 3, undefined])
  returnsInOrder(t, MinHeap.heapify([2, 3, 1]), [1, 2, 3, undefined])
  returnsInOrder(t, MinHeap.heapify([3, 2, 1]), [1, 2, 3, undefined])
})

test('peeking does not remote the item', t => {
  const heap = MinHeap.heapify([3, 2, 1])
  t.is(heap.peek(), 1)
  t.is(heap.peek(), 1)
})

test('return size of heap', t => {
  const heap = MinHeap.heapify([3, 2, 1])
  t.is(heap.size, 3)
})

const returnsInOrder = (t, heap, items) => {
  for (let item of items) {
    t.is(heap.pop(), item)
  }
}

test('max heap returns item in descending order', t => {
  returnsInOrder(t, MaxHeap.heapify([1, 2, 3]), [3, 2, 1, undefined])
  returnsInOrder(t, MaxHeap.heapify([2, 3, 1]), [3, 2, 1, undefined])
  returnsInOrder(t, MaxHeap.heapify([3, 2, 1]), [3, 2, 1, undefined])
})
