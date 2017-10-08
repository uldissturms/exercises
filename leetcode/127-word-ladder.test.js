// [https://leetcode.com/problems/word-ladder]

import test from 'ava'
import fiveCharWords from './127-word-ladder-words-5-chars.data'
import fourCharWords from './127-word-ladder-words-4-chars.data'

const wordList = ['hit', 'hot', 'dot', 'dog', 'lot', 'log', 'cog', 'zip']

test('match', t => {
  t.deepEqual(transformLazy('hit', 'cog', wordList), ['hit', 'hot', 'dot', 'dog', 'cog'])
})

test('one word appart match', t => {
  const words = ['most', 'fist', 'lost', 'cost', 'fish']
  t.deepEqual(transformLazy('lost', 'cost', words), ['lost', 'cost'])
})

test('match even when begin word is not in word list', t => {
  t.deepEqual(transformLazy('hit', 'hot', ['hot']), ['hit', 'hot'])
})

test('empty list when tranformation is not possible', t => {
  t.deepEqual(transformLazy('hit', 'hot', ['zip']), [])
})

test('empty list when end word is not in list', t => {
  t.deepEqual(transformLazy('hit', 'cog', ['hot', 'dot', 'dog', 'lot', 'log']), [])
})

test('count length of the path', t => {
  t.is(transformLazyCount('hit', 'cog', wordList), 5)
})

test('find the shortest path - there can be paths with different lengths at the same level', t => {
  const words = fourCharWords.words
  const path = transformLazy('sand', 'acne', words)
  t.is(path.length, 11)
})

test('long leet list', t => {
  t.is(fiveCharWords.words.length, 4565)

  const time = process.hrtime()
  const path = transformLazy('nanny', 'aloud', fiveCharWords.words)
  const [sec] = process.hrtime(time)

  t.is(path.length, 20)
  t.truthy(sec < 1)
})

const isUndefined = obj =>
  typeof obj === 'undefined'

const not = fn => (...val) =>
  !fn(...val)

const isNotUndefined = not(isUndefined)

const pathTo = (type, word, discovered) => {
  let path = []
  let prev
  let current = word
  while (current !== prev) {
    prev = current
    path = [current, ...path]
    current = discovered[current][type]
  }
  return path
}

const reverse = items => {
  items.reverse()
  return items
}

const oneTransformationAway = (begin, end) => {
  if (begin.length !== end.length) {
    return false
  }

  let singleDifference = false
  for (let i = 0; i < begin.length; i++) {
    if (begin[i] !== end[i]) {
      if (singleDifference) {
        return false
      }
      singleDifference = true
    }
  }

  return singleDifference
}

const wordsOneTransformationAwayFrom = (word, words) =>
  words
    .filter(w => oneTransformationAway(word, w))

const withTrackingInfo = (from, level, words) =>
  words.map(word => ({word, from, level}))

const markAsDiscovered = (words, dict) => {
  for (let word of words) {
    delete dict[word]
  }
}

const toMap = items => {
  const map = {}
  for (let item of items) {
    map[item] = true
  }
  return map
}

const init = (type, word, undiscovered) => {
  markAsDiscovered([word], undiscovered)

  return {
    type,
    queue: [],
    current: {word, from: word, level: 0},
    undiscovered,
    undiscoveredKeys: Object.keys(undiscovered),
    levels: {0: 1}
  }
}

const incrementBy = (by, value = 0) =>
  value + by

const discover = (state, discovered) => {
  discovered[state.current.word] = Object.assign({}, discovered[state.current.word], {[state.type]: state.current.from})

  const toBeDiscovered = wordsOneTransformationAwayFrom(
    state.current.word,
    state.undiscoveredKeys
  )

  if (toBeDiscovered.length > 0) {
    markAsDiscovered(toBeDiscovered, state.undiscovered)
    state.undiscoveredKeys = Object.keys(state.undiscovered)
    const nextLevel = state.current.level + 1
    state.levels[nextLevel] = incrementBy(toBeDiscovered.length, state.levels[nextLevel])
    state.queue.push(...withTrackingInfo(state.current.word, nextLevel, toBeDiscovered))
  }
}

const next = state => {
  state.current = state.queue.shift()
}

const pathsCrossed = ({current}, discovered) =>
  isNotUndefined(current) &&
    isNotUndefined(discovered[current.word]) &&
    isNotUndefined(discovered[current.word].start) &&
    isNotUndefined(discovered[current.word].end)

const buildPathFrom = ({word}, discovered) => {
  const {start, end} = discovered[word]
  const path = []
  path.push(...pathTo('start', start, discovered))
  if (start !== word && end !== word) {
    path.push(word)
  }
  path.push(...reverse(pathTo('end', end, discovered)))
  return path
}

const discoverLevel = (state, discovered) => {
  const level = state.current.level
  let paths = []

  while (isNotUndefined(state.current) && state.current.level === level) {
    discover(state, discovered)
    if (pathsCrossed(state, discovered)) {
      const path = buildPathFrom(state.current, discovered)
      if (shortestPossible(level, path.length)) {
        return path
      }
      paths = [...paths, path]
    }
    next(state)
  }

  return shortest(paths)
}

const shortestPossible = (level, length) =>
  length === level * 2

const shortest = paths => {
  let min = Number.MAX_VALUE
  let answer
  for (let path of paths) {
    if (path.length < min) {
      min = path.lenght
      answer = path
    }
  }

  return answer
}

const levels = (state, fallback = Number.MAX_VALUE) => {
  if (isUndefined(state.current)) {
    return fallback
  }

  if (isUndefined(state.levels[state.current.level])) {
    return fallback
  }

  return state.levels[state.current.level]
}

const transformLazy = (startWord, endWord, wordList) => {
  if (!wordList.includes(endWord)) {
    return []
  }

  const discovered = {}
  const fromStart = init('start', startWord, toMap(wordList))
  const fromEnd = init('end', endWord, toMap(wordList))

  while (isNotUndefined(fromStart.current) || isNotUndefined(fromEnd.current)) {
    const toDiscover = levels(fromStart) < levels(fromEnd) ? fromStart : fromEnd
    const path = discoverLevel(toDiscover, discovered)
    if (path) {
      return path
    }
  }

  return []
}

const transformLazyCount = (beginWord, endWord, wordList) =>
  transformLazy(beginWord, endWord, wordList).length
