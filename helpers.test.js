import test from 'ava'
import {
  flatten,
  flattenBy,
  isArray,
  reverse,
  reverseInplace,
  sortBy,
  memoizeWith,
  id
} from './helpers'

test('flattens to single level', t => {
  t.deepEqual(flatten([1, [2], [[3]]]), [1, 2, 3])
})

test('flattens to custom level', t => {
  const oneLevel = x => isArray(x[0])
  t.deepEqual(flattenBy(oneLevel)([1, [2], [[3]]]), [1, [2], [3]])
})

test('reverse', t => {
  t.deepEqual(reverse(['a', 'b', 'c', 'd']), ['d', 'c', 'b', 'a'])
})

test('reverse inplace', t => {
  const arr = ['a', 'b', 'c', 'd']
  t.deepEqual(
    reverseInplace(0, arr.length - 1, arr), ['d', 'c', 'b', 'a']
  )
})

test('reverse inplace with offset', t => {
  t.deepEqual(
    reverseInplace(1, 2, ['a', 'b', 'c', 'd']), ['a', 'c', 'b', 'd']
  )
  t.deepEqual(
    reverseInplace(1, 3, ['a', 'b', 'c', 'd']), ['a', 'd', 'c', 'b']
  )
})

test('sort - sorts in place', t => {
  t.deepEqual(sortBy(x => x)([1, 3, 2, 5, 4]), [1, 2, 3, 4, 5])
})

test('memoizeWith - single argument', t => {
  let count = 0
  const memoized = memoizeWith(id, (x) => {
    ++count
    return x
  })
  t.is(memoized(1), 1)
  t.is(count, 1)
  t.is(memoized(1), 1)
  t.is(count, 1)
  t.is(memoized(2), 2)
  t.is(count, 2)
})

test('memoizeWith - multi arguments', t => {
  let count = 0
  const memoized = memoizeWith((...x) => x, (x, y) => {
    ++count
    return x + y
  })
  t.is(memoized(1, 2), 3)
  t.is(count, 1)
  t.is(memoized(1, 2), 3)
  t.is(count, 1)
  t.is(memoized(1, 3), 4)
  t.is(count, 2)
})
