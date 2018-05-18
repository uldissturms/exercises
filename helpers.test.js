import test from 'ava'
import {min, flatten, flattenBy, isArray} from './helpers'

test('flattens to single level', t => {
  t.deepEqual(flatten([1, [2], [[3]]]), [1, 2, 3])
})

test('flattens to custom level', t => {
  const oneLevel = x => isArray(x[0])
  t.deepEqual(flattenBy(oneLevel)([1, [2], [[3]]]), [1, [2], [3]])
})
