/*

[https://leetcode.com/problems/word-ladder]

Variations from the original exercise:
  * beginWord needs to be in wordList
  * return shortest path instead of its length

*/

import test from 'ava'
import words from './127-word-ladder-words.data'

const wordList = ['hit', 'hot', 'dot', 'dog', 'lot', 'log', 'cog', 'zip']

test('brute force - finds path', t => {
  t.deepEqual(transformBruteForce('hit', 'cog'), ['hit', 'hot', 'dot', 'dog', 'cog'])
})

test('brute force - no path', t => {
  t.deepEqual(transformBruteForce('hit', 'zip'), [])
})

test('brute force - not a valid word', t => {
  t.deepEqual(transformBruteForce('hit', 'bot'), [])
})

const buildNodeFor = word =>
  ({word, children: []})

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

// O(w^2*len(w))
const buildGraphFrom = words => {
  const map = {}
  for (let word of words) {
    map[word] = buildNodeFor(word)
  }

  for (let from of words) {
    const node = map[from]
    for (let to of words) {
      if (oneTranformationAway(from, to)) {
        node.children.push(map[to])
      }
    }
  }
  return map
}

const graph = buildGraphFrom(wordList)

test('graph - finds path', t => {
  t.deepEqual(transformGraph('hit', 'cog', graph), ['hit', 'hot', 'dot', 'dog', 'cog'])
})

test('graph - no path', t => {
  t.deepEqual(transformBruteForce('hit', 'zip', graph), [])
})

test('graph - not a valid word', t => {
  t.deepEqual(transformGraph('hit', 'bot', graph), [])
})

test('leet - for upload', t => {
  t.is(transformLeet('hit', 'cog', wordList), 5)
})

test('leet - build long graph', t => {
  const wordList = words.fourCharacterWords
  t.is(wordList.length, 2855)

  const start = new Date()
  const graph = buildGraphFrom(words.fourCharacterWords)
  const elapsed = new Date() - start

  t.is(Object.keys(graph).length, wordList.length)
  t.truthy(elapsed / 1000.0 < 1)
})

test.skip('leet - find in long word list', t => {
  const start = new Date()
  const pathLength = transformLeet('sand', 'acne', words.fourCharacterWords)
  const elapsed = new Date() - start

  t.is(pathLength, 11)
  t.truthy(elapsed / 1000.0 < 1) // should run in less than 1 sec - 1.4 sec at the moment
})

const allChars = function * () {
  const start = 'a'.charCodeAt(0)
  const end = 'z'.charCodeAt(0)
  let current = start
  while (current <= end) {
    yield String.fromCharCode(current)
    current++
  }
}

const chars = Array.from(allChars())

const replace = (index, c, word) =>
  word.substr(0, index) + c + word.substr(index + 1)

const isNotAWord = value =>
  !wordList.includes(value)

const transformBruteForce = (beginWord, endWord, index, steps = []) => {
  if (isNotAWord(beginWord)) {
    return []
  }

  if (isNotAWord(endWord)) {
    return []
  }

  if (steps.includes(beginWord)) {
    return []
  }

  if (beginWord === endWord) {
    return [...steps, endWord]
  }

  for (let i = 0; i < beginWord.length; i++) {
    if (i === index) {
      continue
    }
    for (let c of chars) {
      const candidate = replace(i, c, beginWord)
      const path = transformBruteForce(candidate, endWord, i, [...steps, beginWord])
      if (path.length > 0) {
        return path
      }
    }
  }

  return []
}

const isUndefined = obj =>
  typeof obj === 'undefined'

const not = fn => (...val) =>
  !fn(...val)

const isNotUndefined = not(isUndefined)

const addNotVisitedChildrenThatAreNotInQueue = (node, visited, queue) => {
  if (!node.children) {
    return
  }
  queue.push(
    ...node.children
      .filter(c =>
        !visited.some(({word}) => word === c.word) && !queue.some(({word}) => word === c.word)
      )
      .map(c => Object.assign({}, c, {from: node.word}))
  )
}

const buildPath = (from, visited) => {
  let path = []
  let current = from
  while (isNotUndefined(current)) {
    path = [current.word, ...path]
    current = visited.find(({word}) => word === current.from)
  }
  return path
}

const includes = (item, dict) =>
  isNotUndefined(dict[item])

const doesNotInclude = not(includes)

const transformGraph = (beginWord, endWord, graph) => {
  if (doesNotInclude(beginWord, graph)) {
    return []
  }

  if (doesNotInclude(endWord, graph)) {
    return []
  }

  if (beginWord === endWord) {
    return [beginWord, endWord]
  }

  const visited = []
  const begin = graph[beginWord]
  const queue = [begin]
  let current = queue.shift()

  while (isNotUndefined(current)) {
    visited.push(current)
    if (current.word === endWord) {
      return buildPath(current, visited)
    }

    addNotVisitedChildrenThatAreNotInQueue(current, visited, queue)
    current = queue.shift()
  }

  return []
}

const transformLeet = (beginWord, endWord, wordList) => {
  const graph = buildGraphFrom([...wordList, beginWord])
  const path = transformGraph(beginWord, endWord, graph)
  return path.length
}
