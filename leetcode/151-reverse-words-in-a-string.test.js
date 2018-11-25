// [https://leetcode.com/problems/reverse-words-in-a-string]

const test = require('ava')
const {
  toWords,
  fromWords,
  reverse,
  reverseInplace,
  filter,
  isNotEmpty,
  split,
  join,
  compose
} = require('../helpers')

test('reverses words in a string', t => {
  t.is(reverseWords('the sky is blue'), 'blue is sky the')
})

test('reverses words in a string in place', t => {
  t.is(reverseWordsInplace('the sky is blue'), 'blue is sky the')
})

test('should handle empty strings', t => {
  t.is(reverseWords(' '), '')
  t.is(reverseWords('  a  '), 'a')
  t.is(reverseWords('a b  c '), 'c b a')
})

test('should handle empty strings', t => {
  t.is(reverseWordsInplace(' '), '')
  t.is(reverseWordsInplace('  a  '), 'a')
  t.is(reverseWordsInplace(' a b  c'), 'c b a')
})

const SPACE = ' '
const reverseWords = compose(
  fromWords,
  reverse,
  filter(isNotEmpty),
  toWords
)

const reverseWordByWord = arr => {
  let start = 0
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === SPACE) {
      reverseInplace(start, i - 1, arr)
      start = i + 1
    }
  }
  reverseInplace(start, arr.length - 1, arr)
  return arr
}

const removeMultipleSpaces = arr => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === SPACE && (arr[i + 1] === SPACE || i === 0 || i === arr.length - 1)) {
      arr.splice(i, 1)
      i--
    }
  }

  return arr
}

const reverseWordsInplace = compose(
  join(''),
  reverseWordByWord,
  removeMultipleSpaces,
  xs => reverseInplace(0, xs.length - 1, xs),
  split('')
)
