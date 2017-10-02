// [https://leetcode.com/problems/word-ladder]

import test from 'ava'
import fiveCharWords from './127-word-ladder-words-5-chars.data'

const wordList = ['hit', 'hot', 'dot', 'dog', 'lot', 'log', 'cog', 'zip']

test('match', t => {
  t.deepEqual(transformLazy('hit', 'cog', wordList), ['hit', 'hot', 'dot', 'dog', 'cog'])
})

test('immediate match', t => {
  t.deepEqual(transformLazy('hit', 'hot', wordList), ['hit', 'hot'])
})

test('match even when begin word is not in word list', t => {
  t.deepEqual(transformLazy('hit', 'hot', ['hot']), ['hit', 'hot'])
})

test('empty list when tranformation is not possible', t => {
  t.deepEqual(transformLazy('hit', 'hot', ['zip']), [])
})

test('count length of the path', t => {
  t.is(transformLazyCount('hit', 'cog', wordList), 5)
})

test.skip('long leet list', t => {
  t.is(fiveCharWords.words.length, 4565)

  const start = new Date()
  const path = transformLazy('nanny', 'aloud', fiveCharWords.words)
  const elapsed = new Date() - start

  t.is(path.length, 20)
  t.truthy(elapsed / 1000.0 < 1) // should run in less than 1 sec - 2.6 sec at the moment
})

const isUndefined = obj =>
  typeof obj === 'undefined'

const not = fn => (...val) =>
  !fn(...val)

const isNotUndefined = not(isUndefined)

const buildPath = (from, visited) => {
  let path = []
  let current = from
  while (isNotUndefined(current)) {
    path = [current.word, ...path]
    current = visited.find(({word}) => word === current.from)
  }
  return path
}

const oneTranformationAway = (begin, end) => {
  if (begin.length !== end.length) {
    return false
  }

  let diffs = 0
  for (let i = 0; i < begin.length; i++) {
    if (begin[i] !== end[i]) {
      diffs++
    }
  }

  return diffs === 1
}

const wordsOneTransformationAwayFrom = (word, words) =>
  words.filter(w => oneTranformationAway(word, w))

const nonDiscovered = (words, discovered) =>
  words.filter(word => isUndefined(discovered[word]))

const addFrom = (from, words) =>
  words.map(word => ({from, word}))

const markAsDiscovered = (words, dict = {}) => {
  for (let word of words) {
    dict[word] = true
  }

  return dict
}

const transformLazy = (beginWord, endWord, wordList) => {
  const discovered = markAsDiscovered([beginWord])
  const visited = []
  const queue = []
  let current = {word: beginWord}

  while (isNotUndefined(current)) {
    visited.push(current)
    if (current.word === endWord) {
      return buildPath(current, visited)
    }

    const toBeDiscovered = nonDiscovered(
      wordsOneTransformationAwayFrom(current.word, wordList),
      discovered
    )
    markAsDiscovered(toBeDiscovered, discovered)
    queue.push(...addFrom(current.word, toBeDiscovered))

    current = queue.shift()
  }

  return []
}

const transformLazyCount = (beginWord, endWord, wordList) =>
  transformLazy(beginWord, endWord, wordList).length
