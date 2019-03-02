import test from 'ava';
import { linkedList } from './linked-list'

test('head - returns undefined - empty list', t => {
  const ll = linkedList()
  t.deepEqual(ll.head(), undefined)
})

test('head - returns last element added - single element', t => {
  const ll = linkedList()
  ll.append(1)
  t.is(ll.head().data, 1)
})

test('head - returns last element added - two items', t => {
  const ll = linkedList()
  ll.append(1)
  ll.append(2)
  t.is(ll.head().data, 2)
})

test('tail - returns undefined - empty list', t => {
  const ll = linkedList()
  t.deepEqual(ll.tail(), undefined)
})

test('tail - returns first element added - single element', t => {
  const ll = linkedList()
  ll.append(1)
  t.is(ll.tail().data, 1)
})

test('tail - returns first element added - two items', t => {
  const ll = linkedList()
  ll.append(1)
  ll.append(2)
  t.is(ll.tail().data, 1)
})

test('next - returns undefined - single item', t => {
  const ll = linkedList()
  ll.append(1)
  t.is(ll.head().next(), undefined);
})

test('next - returns next item - two items', t => {
  const ll = linkedList()
  ll.append(1)
  ll.append(2)
  t.is(ll.head().next().data, 1);
})

test('prev - returns undefined - single item', t => {
  const ll = linkedList()
  ll.append(1)
  t.is(ll.head().prev(), undefined);
})

test('next - returns previous item - two items', t => {
  const ll = linkedList()
  ll.append(1)
  ll.append(2)
  t.is(ll.tail().prev().data, 2);
})

test('size - returns number of items', t => {
  const ll = linkedList()
  t.is(ll.size(), 0)
  ll.append(1)
  t.is(ll.size(), 1)
  ll.append(2)
  t.is(ll.size(), 2)
})
