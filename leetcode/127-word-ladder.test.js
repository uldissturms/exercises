// [https://leetcode.com/problems/word-ladder]

import test from 'ava'
import fiveCharWords from './127-word-ladder-words-5-chars.data'
import fourCharWords from './127-word-ladder-words-4-chars.data'
import {transform, head} from './word-ladder'

const wordList = ['hit', 'hot', 'dot', 'dog', 'lot', 'log', 'cog', 'zip']

test('match', t => {
  t.deepEqual(
    head(transform('hit', 'cog', wordList)),
    ['hit', 'hot', 'dot', 'dog', 'cog']
  )
})

test('one word appart match', t => {
  const words = ['most', 'fist', 'lost', 'cost', 'fish']
  t.deepEqual(transform('lost', 'cost', words), [['lost', 'cost']])
})

test('match even when begin word is not in word list', t => {
  t.deepEqual(transform('hit', 'hot', ['hot']), [['hit', 'hot']])
})

test('empty list when tranformation is not possible', t => {
  t.deepEqual(transform('hit', 'hot', ['zip']), [])
})

test('empty list when end word is not in list', t => {
  t.deepEqual(transform('hit', 'cog', ['hot', 'dot', 'dog', 'lot', 'log']), [])
})

test('count length of the path', t => {
  t.is(numberOfTransformations('hit', 'cog', wordList), 5)
})

test('find the shortest path - there can be paths with different lengths at the same level', t => {
  const words = fourCharWords.words
  t.is(numberOfTransformations('sand', 'acne', words), 11)
})

test('long leet list', t => {
  t.is(fiveCharWords.words.length, 4565)

  const time = process.hrtime()
  const transformations = numberOfTransformations('nanny', 'aloud', fiveCharWords.words)
  const [sec] = process.hrtime(time)

  t.is(transformations, 20)
  t.truthy(sec < 1)
})

const numberOfTransformations = (beginWord, endWord, wordList) =>
  head(transform(beginWord, endWord, wordList)).length
