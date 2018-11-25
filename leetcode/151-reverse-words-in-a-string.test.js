// [https://leetcode.com/problems/reverse-words-in-a-string]

const test = require('ava')
const {toWords, fromWords, reverse, filter, isNotEmpty, compose} = require('../helpers')

test('reverses words in a string', t => {
  t.is(reverseWords('the sky is blue'), 'blue is sky the')
})

test('should handle empty strings', t => {
  t.is(reverseWords('a b  c '), 'c b a')
})

const reverseWords = compose(
  fromWords,
  reverse,
  filter(isNotEmpty),
  toWords
)
