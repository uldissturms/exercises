import test from 'ava'

test('max booked time', t => {
  t.is(max([30, 15, 60, 75, 45, 15, 15, 45]), 180)
  t.is(max([]), 0)
})

const max = items =>
  take(items, items.length - 1)

const take = (items, index, cache = {}) => {
  if (index <= -1) {
    return 0
  }

  if (cache[index]) {
    return cache[index]
  }

  const whenTake = take(items, index - 2, cache) + items[index]
  const whenDontTake = take(items, index - 1, cache)
  return cacheAndReturn(cache, index, Math.max(whenTake, whenDontTake))
}

const cacheAndReturn = (cache, key, value) => {
  cache[key] = value
  return value
}
