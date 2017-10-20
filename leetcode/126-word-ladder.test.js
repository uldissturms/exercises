// [https://leetcode.com/problems/word-ladder-ii]

import test from 'ava'
import {transform, discoverLevel, init, toMap} from './word-ladder'

const wordList = ['hot', 'dot', 'dog', 'lot', 'log', 'cog', 'zip']

// TODO: update discovered keys once per level, many items can be converging to the same element
test.only('match', t => {
  t.deepEqual(transform('hit', 'cog', wordList), [
    ['hit', 'hot', 'dot', 'dog', 'cog'],
    ['hit', 'hot', 'lot', 'log', 'cog']
  ])
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
