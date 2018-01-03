// https://en.wikipedia.org/wiki/Heap_(data_structure)

const {head, isUndefined} = require('../helpers')

const isLeftChild = i =>
  i % 2 === 1
const leftChildFor = i =>
  (2 * i) + 1
const rightChildFor = i =>
  (2 * i) + 2
const parentFor = i =>
  isLeftChild(i)
  ? (i - 1) / 2
  : (i - 2) / 2

class Heap {
  constructor (cmp) {
    this.array = []
    this.cmp = cmp
  }
  // can be optimized to linear time using Floyd algorithm - https://en.wikipedia.org/wiki/Heapsort#Variations
  static heapify (cmp, items) {
    const heap = new Heap(cmp)
    for (let item of items) {
      heap.insert(item)
    }
    return heap
  }

  insert (data) {
    this.array.push(data)
    this.bubbleUp(this.array.length - 1)
  }

  bubbleUp (index) {
    if (index === 0) {
      return
    }

    const node = this.array[index]
    const parentIndex = parentFor(index)
    const parent = this.array[parentIndex]
    if (this.cmp(node, parent)) {
      this.swap(index, parentIndex)
      this.bubbleUp(parentIndex)
    }
  }

  swap (from, to) {
    const temp = this.array[to]
    this.array[to] = this.array[from]
    this.array[from] = temp
  }

  pop () {
    if (this.array.length === 1) {
      return this.array.pop()
    }
    const root = head(this.array)
    this.array[0] = this.array.pop()
    this.bubbleDown(0)
    return root
  }

  minChildFor (index) {
    const left = leftChildFor(index)
    const right = rightChildFor(index)
    if (left >= this.array.length) {
      return undefined
    }

    if (right >= this.array.length) {
      return left
    }

    return this.cmp(this.array[left], this.array[right])
      ? left
      : right
  }

  bubbleDown (index) {
    const childIndex = this.minChildFor(index)
    if (isUndefined(childIndex)) {
      return
    }

    if (this.cmp(this.array[childIndex], this.array[index])) {
      this.swap(index, childIndex)
      this.bubbleDown(childIndex)
    }
  }

  peek () {
    return head(this.array)
  }

  get size () {
    return this.array.length
  }
}

const less = (x, y) =>
  x < y
const greater = (x, y) =>
  x > y

class MinHeap extends Heap {
  static heapify (items) {
    return super.heapify(less, items)
  }
  constructor () {
    super(less)
  }
}

class MaxHeap extends Heap {
  static heapify (items) {
    return super.heapify(greater, items)
  }
  constructor () {
    super(greater)
  }
}

module.exports = {
  MinHeap,
  MaxHeap,
  Heap
}
