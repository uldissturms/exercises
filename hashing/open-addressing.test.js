import test from 'ava'
import { isNotUndefined, isUndefined } from '../helpers'

test('hash function returns index for first iteration', t => {
  t.is(hash(1, 0), 1)
  t.is(hash(2, 0), 2)
})

test('hash function returns index for second iteration', t => {
  t.is(hash(1, 1), 2)
  t.is(hash(2, 1), 3)
})

test('hash wraps around if generated key > size of hash table', t => {
  t.is(hashWithSize(2)(3, 0), 1)
  t.is(hashWithSize(2)(3, 1), 0)
})

test('cannot hash undefined key', t => {
  const key = undefined
  const error = t.throws(() => hash(key, 0), Error)
  t.is(error.message, `Invalid key: ${key}`)
})

const key = 0
const value = 'some-value'

const takenKey = 10000
const takenValue = 'taken'
const taken = {key: takenKey, value: takenValue}

test('adds to the map if slot is available', t => {
  t.deepEqual(add(hash, key, value, []), [{key, value}])
  t.deepEqual(add(hash, 1, value, []), [undefined, {key: 1, value}])
})

test('adds to the map if slot is deleted', t => {
  t.deepEqual(add(hash, key, value, [DELETED]), [{key, value}])
})

test('adds to the map in next available slot if the first one is taken', t => {
  t.deepEqual(add(hash, key, value, [taken]), [taken, {key, value}])
})

test('find an item by key', t => {
  const key = 1
  t.is(search(hash, key, [undefined, {key, value}]), value)
})

test('continue search if deleted item encoutered', t => {
  t.is(search(hash, key, [DELETED, {key, value}]), value)
})

test('remove item by marking it as deleted', t => {
  t.deepEqual(remove(hash, key, [{key, value}]), [DELETED])
})

test('remove ignores missing key', t => {
  t.deepEqual(remove(hash, key, []), [])
})

test('all operations on hash', t => {
  let map = []
  map = add(hash, key, value, map)
  t.is(search(hash, key, map), value)
  map = remove(hash, key, map)
  t.is(search(hash, key, map), undefined)
})

test('open addressing', t => {
  const map = openAddressing(10)
  map.add(key, value)
  t.is(map.search(key), value)
  map.remove(key)
  t.is(map.search(key), undefined)
})

const DEFAULT_HASH_ARR_SIZE = 1000

const openAddressing = (size = DEFAULT_HASH_ARR_SIZE) => {
  const map = []
  const hash = hashWithSize(size)
  return {
    add: (key, value) => add(hash, key, value, map, size),
    search: (key) => search(hash, key, map, size),
    remove: (key) => remove(hash, key, map, size)
  }
}

// TODO: Improve key distribution - at the moment key clustering
// NOTE: Linear probing h(k, i) = (h'(k) + i) mod m
// NOTE: Double hasing would work better where h(k, 1) = (h1(k) + i * h2(k)) mod m,
// where h2(k) is a relative prime to m
const hashWithSize = (size) => (key, iteration) => {
  if (isUndefined(key)) {
    throw new Error(`Invalid key: ${key}`)
  }
  return (key + iteration) % size
}

const hash = hashWithSize(DEFAULT_HASH_ARR_SIZE)

const isNotUndefinedOrNotDeleted = (x) =>
  isNotUndefined(x) && x !== DELETED

const add = (hashFn, key, value, map) => {
  let iteration = 0
  let index = hashFn(key, iteration)

  while (isNotUndefinedOrNotDeleted(map[index])) {
    index = hashFn(key, ++iteration)
  }

  map[index] = {key, value}
  return map
}

const onKeyFound = (fn) => (hashFn, key, map) => {
  let iteration = 0
  let index = hashFn(key, iteration)

  while (isNotUndefined(map[index])) {
    const candidate = map[index]
    if (candidate.key === key) {
      return fn(map, index)
    }
    index = hashFn(key, ++iteration)
  }

  return undefined
}

const search = onKeyFound(
  (map, index) => map[index].value
)

const DELETED = { deleted: true }

const remove = (hashFn, key, map) => {
  onKeyFound(
    (map, index) => { map[index] = DELETED }
  )(
    hashFn,
    key,
    map
  )
  return map
}
