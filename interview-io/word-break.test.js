// [https://leetcode.com/problems/word-break-ii/]

/*

 Given a string and a set of words, break the string into a list of words from the set. If the word can not be segmented fully, return an empty list.
Example:
Set: {"jump", "jumped", "jumpedov", "over", "some", "thing", "something"}
String: "jumpedoversomething",
Can return [“jumped”, “over”, “something”] or  [ “jumped”, “over”, “some”, “thing”]

 */

import test from 'ava'

test('word break - simple', t => {
  const actual = wordBreak('catdogfox', new Set(['cat', 'dog', 'fox']))
  const expected = [
    ['cat', 'dog', 'fox']
  ]
  t.deepEqual(actual, expected)
})

test('word break - example', t => {
  const word = 'jumpedoversomething'
  const dict = new Set(['jump', 'jumped', 'jumpedov', 'over', 'some', 'thing', 'something'])
  const actual = wordBreak(word, dict)
  const expected = [
    ['jumped', 'over', 'some', 'thing'],
    ['jumped', 'over', 'something']
  ]
  t.deepEqual(actual, expected)
})

test('word break - leetcode', t => {
  t.deepEqual(
    wordBreak(
      'ab',
      new Set(['a', 'b'])
    ),
    [
      [ 'a', 'b' ]
    ]
  )
  t.deepEqual(
    wordBreak(
      'catsanddog',
      new Set(['cat', 'cats', 'and', 'sand', 'dog'])
    ),
    [
      [ 'cats', 'and', 'dog' ],
      [ 'cat', 'sand', 'dog' ]
    ]
  )
  t.deepEqual(
    wordBreak(
      'pineapplepenapple',
      new Set(['apple', 'pen', 'applepen', 'pine', 'pineapple'])
    ),
    [
      [ 'pine', 'apple', 'pen', 'apple' ],
      [ 'pineapple', 'pen', 'apple' ],
      [ 'pine', 'applepen', 'apple' ]
    ]
  )
  t.deepEqual(
    wordBreak(
      'catsandog',
      new Set(['cats', 'dog', 'sand', 'and', 'cat'])
    ),
    []
  )
})

const wordBreak = (w, dict) => {
  const map = init(w.length)
  for (let len = 1; len <= w.length; len++) {
    for (let from = 0; from <= w.length - len; from++) {
      const to = from + len - 1
      const part = w.slice(from, to + 1)
      const parents = combinedOfWords(from, to, map)
      if (isAWord(part, dict)) {
        parents.add(from)
      }
      map[from][to] = parents
    }
  }
  return pathsFor(w, dict, map)
}

const init = (length) =>
  new Array(length).fill()
    .map((x) => new Array(length).fill())

const isAWord = (w, dict) =>
  dict.has(w)

const combinedOfWords = (from, to, map) => {
  const parents = new Set()
  for (let splitAt = to - 1; splitAt >= from; splitAt--) {
    if (map[from][splitAt].size > 0 && map[splitAt + 1][to].size > 0) {
      parents.add(splitAt + 1)
    }
  }
  return parents
}

const pathsFor = (w, dict, map, to = map.length - 1, path = []) => {
  if (to === -1) {
    return [path]
  }

  const parents = map[0][to]
  const paths = []
  for (const from of parents) {
    const part = w.slice(from, to + 1)
    if (isAWord(part, dict)) {
      paths.push(
        ...pathsFor(w, dict, map, from - 1, [part, ...path])
      )
    }
  }

  return paths
}
