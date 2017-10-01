/*

[https://leetcode.com/problems/word-ladder]

Variations from the original exercise:
  * beginWord needs to be in wordList
  * return shortest path instead of its length

*/

import test from 'ava'

test('brute force - finds path', t => {
  t.deepEqual(transformBruteForce('hit', 'cog'), ['hit', 'hot', 'dot', 'dog', 'cog'])
})

test('brute force - no path', t => {
  t.deepEqual(transformBruteForce('hit', 'zip'), [])
})

test('brute force - not a valid word', t => {
  t.deepEqual(transformBruteForce('hit', 'bot'), [])
})

test('graph - finds path', t => {
  t.deepEqual(transformGraph('hit', 'cog'), ['hit', 'hot', 'dot', 'dog', 'cog'])
})

test('graph - no path', t => {
  t.deepEqual(transformBruteForce('hit', 'zip'), [])
})

test('graph - not a valid word', t => {
  t.deepEqual(transformGraph('hit', 'bot'), [])
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
const wordList = ['hit', 'hot', 'dot', 'dog', 'lot', 'log', 'cog', 'zip']
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

const buildNodeFor = word =>
  ({word, children: []})

const oneTranformationAway = (begin, end) => {
  if (begin.length !== end.length) {
    return false
  }

  let diffs = 0
  for (let i in begin) {
    if (begin[i] !== end[i]) {
      diffs++
    }
  }

  return diffs === 1
}

// O(N**2)
const buildGraphFrom = words => {
  const map = words.reduce((acc, cur) => { acc[cur] = buildNodeFor(cur); return acc }, {})
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

const isUndefined = obj =>
  typeof obj === 'undefined'
const not = fn => val =>
  !fn(val)
const isNotUndefined = not(isUndefined)
const graph = buildGraphFrom(wordList)

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
const transformGraph = (beginWord, endWord) => {
  if (isNotAWord(beginWord)) {
    return []
  }

  if (isNotAWord(endWord)) {
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
