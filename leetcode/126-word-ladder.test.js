// [https://leetcode.com/problems/word-ladder-ii]

import test from 'ava'
import fiveCharWords from './126-word-ladder-words-5-chars.data'
import {transform, discoverLevel, init, toMap, head} from './word-ladder'

const wordList = ['hot', 'dot', 'dog', 'lot', 'log', 'cog', 'zip']

test('multiple paths from different intersections', t => {
  t.deepEqual(transform('hit', 'cog', wordList), [
    ['hit', 'hot', 'dot', 'dog', 'cog'],
    ['hit', 'hot', 'lot', 'log', 'cog']
  ])
})

test('multiple paths for same intersection', t => {
  const words = ['fan', 'fit', 'fin', 'can', 'cat', 'fat']
  t.deepEqual(transform('cat', 'fin', words), [
    ['cat', 'can', 'fan', 'fin'],
    ['cat', 'fat', 'fan', 'fin'],
    ['cat', 'fat', 'fit', 'fin']
  ])
})

test.skip('long leet list', t => {
  const words = fiveCharWords.words
  t.is(words.length, 1648)

  const time = process.hrtime()
  const paths = transform('zings', 'brown', fiveCharWords.words)
  const [sec] = process.hrtime(time)

  t.is(paths.length, 127)
  t.is(head(paths).length, 12)
  t.truthy(sec < 1) // 1.2 sec at the moment
})

test('all words in level are discovered', t => {
  const state = init('end', 'cog', toMap(wordList))
  const discovered = {}
  discoverLevel(state, discovered)
  t.deepEqual(state.current.word, 'dog')
  t.deepEqual(state.queue, [
    // {word: 'dog', from: 'cog', level: 1}, - first item is read from next level to signal the end and prepare for next
    {word: 'log', from: 'cog', level: 1}
  ])
})
