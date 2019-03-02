import test from 'ava'
import { isUndefined, isNotUndefined } from '../helpers'
import { linkedList } from '../data-structures/linked-list'

test('hashing - chaining - dummy hashing fn', t => {
  t.is(naiveHash(0), 0)
  t.is(naiveHash(1), 1)
  t.is(naiveHash(2), 0)
  t.is(naiveHash(3), 3)
  t.is(naiveHash(4), 0)
})

test('hashing - chaining - return no existing item', t => {
  const map = hashmap(naiveHash);
  t.is(map.get(1), undefined)
})

test('hashing - chaining - single item', t => {
  const map = hashmap(naiveHash);
  map.put(1, 'a')
  t.is(map.get(1), 'a')
})

test('hashing - chaining - multiple items', t => {
  const map = hashmap(naiveHash);
  map.put(1, 'a')
  map.put(2, 'b')
  t.is(map.get(1), 'a')
  t.is(map.get(2), 'b')
})

test('hashing - chaining - update single item', t => {
  const map = hashmap(naiveHash);
  map.put(1, 'a')
  map.put(1, 'b')
  t.is(map.get(1), 'b')
})

test('hashing - chaining - update multiple items that collide on hashes', t => {
  const map = hashmap(naiveHash);
  map.put(0, 'a1')
  map.put(2, 'a2')
  map.put(0, 'b1')
  map.put(2, 'b2')
  console.log('should have 2 items')
  t.is(map.get(0), 'b1')
  t.is(map.get(2), 'b2')
})

const naiveHash = (x) =>
  x % 2 === 0 ? 0 : x

const hashmap = (hashFn) => {
  const map = {}
  return {
    put: put(hashFn, map),
    get: get(hashFn, map)
  }
}

const getItemByKey = (key, ll) => {
  let x = ll.head()

  while (isNotUndefined(x)) {
    if (x.data.key === key) {
      return x.data
    }

    x = x.next()
  }
}

const put = (hashFn, map) => (key, value) => {
  const hash = hashFn(key)
  if (isUndefined(map[hash])) {
    map[hash] = linkedList()
  }

  const ll = map[hash]
  const item = getItemByKey(key, ll)
  if (item) {
    item.value = value
  } else {
    ll.append({ key, value })
  }
}

const get = (hashFn, map) => (key) => {
  const hash = hashFn(key)
  const ll = map[hash];

  if (isUndefined(ll)) {
    return undefined
  }

  const item = getItemByKey(key, ll)
  return item && item.value
}
