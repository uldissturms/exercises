import test from 'ava'
import {isUndefinedOrEmpty} from '../helpers'

const dict = new Set([
  'I', 'a', 'am', 'ace',
  'lo', 'loo', 'look', 'looked', 'ok', 'oked',
  'cat', 'cats', 'and', 'dog'
])

// best for n -> best for n - 1 with space and n - 1 without space
test('splits to minimize unrecognized characters', t => {
  t.is(respace(dict, 'jesslooked'), 'jess looked')
  t.is(respace(dict, 'Iamace'), 'I am ace')
  t.is(respace(dict, 'a'), 'a')
  t.is(respace(dict, ''), '')
  t.is(respace(dict, undefined), undefined)
  t.is(respace(dict, 'catsanddog'), 'cats and dog')
})

// O(2^n) - n - length of word
const respace = (dict, word) => {
  if (isUndefinedOrEmpty(word)) {
    return word
  }

  return minFor(dict, word, word.length - 1, {}).word
}

const minFor = (dict, word, index) => {
  if (index === 0) {
    return {word, score: score(dict, word)}
  }

  const space = minFor(dict, spaceAt(index, word), index - 1)
  const noSpace = minFor(dict, word, index - 1)
  return space.score < noSpace.score
    ? space
    : noSpace
}

const spaceAt = (index, word) =>
  word.substring(0, index) + ' ' + word.substring(index)

const sum = (acc, cur) =>
  acc + cur

const score = (dict, word) => {
  return word.split(' ')
    .map(w => dict.has(w) ? 0 : w.length)
    .reduce(sum, 0)
}
