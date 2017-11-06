// [https://leetcode.com/problems/lru-cache]

import test from 'ava'
import LRUCache from './lru-cache'

test('store value in cache', t => {
  const cache = new LRUCache()
  const key = 'a'
  const value = 123
  cache.put(key, value)
  t.is(cache.get(key), value)
})

test('updates cache value', t => {
  const cache = new LRUCache()
  const key = 'a'
  const value = 123
  const newValue = 234
  cache.put(key, value)
  cache.put(key, newValue)
  t.is(cache.get(key), newValue)
})

test('enforce capacity', t => {
  const cache = new LRUCache(2)
  cache.put('a', 123)
  cache.put('b', 234)
  cache.put('c', 345)

  t.is(cache.get('a'), undefined)
})

test('evicts least recently used', t => {
  const cache = new LRUCache(2)
  cache.put('a', 123)
  cache.put('b', 234)
  cache.get('a') // update lru for a, so that b gets evicted
  cache.put('c', 345)

  t.is(cache.get('b'), undefined)
})

test('sequence of actions', t => {
  const cache = new LRUCache(2)
  cache.put(1, 1)
  cache.put(2, 2)
  cache.get(1)
  cache.put(3, 3)
  t.is(cache.get(2), undefined)
  t.is(cache.get(3), 3)
  t.is(cache.get(1), 1)
  cache.put(4, 4)
  t.is(cache.get(3), undefined)
  t.is(cache.get(4), 4)
  t.is(cache.get(1), 1)
})
