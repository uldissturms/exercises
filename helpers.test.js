import test from 'ava'
import {flatten, flattenBy, isArray, reverse} from './helpers'

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
