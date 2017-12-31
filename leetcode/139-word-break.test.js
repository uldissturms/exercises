import test from 'ava'
import {isUndefinedOrEmpty} from '../helpers'

test('determines if word can be splitted in parts', t => {
  t.truthy(wordBreak('leetcode', ['leet', 'code']))
  t.falsy(wordBreak('leetcode', ['leet']))
  t.falsy(wordBreak('', ['leet', 'code']))
  t.falsy(wordBreak(undefined, ['leet', 'code']))
})

const wordBreak = (s, wordDict) => {
  if (isUndefinedOrEmpty(s)) {
    return false
  }

  const map = calculate(new Set(wordDict), s)
  return map.get(keyFor(0, s.length)).score === 0
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
    if (min === 0) {
      return cacheAndReturn(cache, key, {score: min, from: best})
    }
  }

  return cacheAndReturn(cache, key, {score: min, from: best})
}

const cacheAndReturn = (cache, key, val) => {
  cache.set(key, val)
  return val
}
