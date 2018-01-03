import test from 'ava'
import {MinHeap, MaxHeap} from '../data-structures/heaps'
import {isUndefined} from '../helpers'

test('calculates median based on seed', t => {
  t.is(median([1, 2]).value(), 1.5)
  t.is(median([1]).value(), 1)
  t.is(median().value(), 0)
})

test('keeps mediam up to date', t => {
  const m = median()
  t.is(m.value(), 0)
  m.next(1)
  t.is(m.value(), 1)
  m.next(2)
  t.is(m.value(), 1.5)
  m.next(3)
  t.is(m.value(), 2)
  m.next(100)
  t.is(m.value(), 2.5)
  m.next(200)
  t.is(m.value(), 3)
})

const next = (val, left, right) => {
  const topLeft = left.peek()
  const topRight = right.peek()

  if (left.size === right.size) {
    if (isUndefined(topLeft) || val <= topRight) {
      return left.insert(val)
    }
    right.pop() // can be optimized with a call to replace
    right.insert(val)
    return left.insert(topRight)
  }

  if (val >= topLeft) {
    return right.insert(val)
  }

  left.pop() // replace optimization can be applied
  left.insert(val)
  return right.insert(topLeft)
}

const value = (left, right) => {
  if (left.size === 0) {
    return 0
  }

  if (left.size === right.size) {
    return (left.peek() + right.peek()) / 2
  }

  return left.peek()
}

const median = (seed = []) => {
  const left = new MaxHeap()
  const right = new MinHeap()

  for (let s of seed) {
    next(s, left, right)
  }

  return {
    next: val => next(val, left, right),
    value: () => value(left, right)
  }
}
