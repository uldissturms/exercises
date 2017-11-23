import test from 'ava'

const person = (height, weight) =>
  ({height, weight})

test('tower with most people - book', t => {
  const people = [
    person(65, 100),
    person(70, 150),
    person(56, 90),
    person(75, 190),
    person(60, 95),
    person(68, 110)
  ]
  t.deepEqual(maxTower(people), [
    person(75, 190),
    person(70, 150),
    person(68, 110),
    person(65, 100),
    person(60, 95),
    person(56, 90)
  ])
})

test('tower with people left out', t => {
  const people = [
    person(30, 110),
    person(30, 110),
    person(60, 110),
    person(50, 100),
    person(70, 90),
    person(80, 80),
    person(30, 30)
  ]

  t.deepEqual(maxTower(people), [
    person(60, 110),
    person(50, 100),
    person(30, 30)
  ])
})

const byWeight = (left, right) =>
  right.weight - left.weight

const sortByWeightDesc = items =>
  items.sort(byWeight)

const maxTower = people => {
  const sorted = sortByWeightDesc(people)
  return maxFor(sorted, sorted.length - 1)
}

const keyFor = (index, minHeight) =>
  `${index}_${minHeight}`

const cacheAndReturn = (cache, key, data) => {
  cache[key] = data
  return data
}

const isNotUndefined = obj =>
  typeof obj !== 'undefined'

const maxFor = (people, index, minHeight = 0, cache = {}) => {
  const key = keyFor(index, minHeight)
  const data = cache[key]
  if (isNotUndefined(data)) {
    return data
  }

  if (index === -1) {
    return []
  }

  const current = people[index]
  const dontTake = maxFor(people, index - 1, minHeight, cache)
  if (current.height < minHeight) {
    return cacheAndReturn(cache, key, dontTake)
  }

  const take = [...maxFor(people, index - 1, current.height, cache), current]
  return cacheAndReturn(cache, key, dontTake.length > take.length ? dontTake : take)
}
