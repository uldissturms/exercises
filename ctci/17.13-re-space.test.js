import test from 'ava'
import {isUndefinedOrEmpty, head} from '../helpers'

const dict = new Set([
  'I', 'a', 'am', 'ace',
  'loo', 'look', 'looked', 'ok', 'oked', 'just', 'like', 'her', 'brother',
  'cat', 'cats', 'and', 'dog'
])

test('splits to minimize unrecognized characters', t => {
  t.is(respace(dict, 'jesslookedjustliketimherbrother'), 'jess looked just like tim her brother')
  t.is(respace(dict, 'Iamace'), 'I am ace')
  t.is(respace(dict, 'a'), 'a')
  t.is(respace(dict, ''), '')
  t.is(respace(dict, undefined), undefined)
  t.is(respace(dict, 'catsanddog'), 'cats and dog')
})

const respace = (dict, word) => {
  if (isUndefinedOrEmpty(word)) {
    return word
  }

  const map = calculate(dict, word)
  const path = pathFor(0, word.length, map)
  return split(0, path, word)
}

const calculate = (dict, word) => {
  const cache = new Map()
  for (let len = 1; len <= word.length; len++) {
    for (let from = 0; from + len <= word.length; from++) {
      const to = from + len
      score(dict, word, from, to, cache)
    }
  }
  return cache
}

const pathFor = (from, to, map) => {
  const traced = map.get(keyFor(from, to))
  if (traced.from !== from) {
    return [traced.from,
      ...pathFor(traced.from, to, map),
      ...pathFor(from, traced.from, map)
    ]
  }

  return []
}

const split = (from, path, word) => {
  if (path.length === 0) {
    return word.substring(from)
  }

  const first = head(path)
  return word.substring(from, first) + ' ' + split(first, path.slice(1), word)
}

const keyFor = (from, to) =>
  `${from}_${to}`

const score = (dict, word, from, to, cache) => {
  const key = keyFor(from, to)
  if (cache.has(key)) {
    return cache.get(key)
  }

  const part = word.substring(from, to)
  if (dict.has(part)) {
    return cacheAndReturn(cache, key, {score: 0, from})
  }

  let min = to - from + 1
  let best = from
  for (let i = from + 1; i < to; i++) {
    const res = score(dict, word, from, i, cache).score + score(dict, word, i, to, cache).score
    if (res < min) {
      min = res
      best = i
    }
  }

  return cacheAndReturn(cache, key, {score: min, from: best})
}

const cacheAndReturn = (cache, key, val) => {
  cache.set(key, val)
  return val
}
