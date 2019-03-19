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
  const expected = ['cat', 'dog', 'fox']
  t.deepEqual(actual, expected)
})

test('word break - example', t => {
  const word = 'jumpedoversomething'
  const dict = new Set(['jump', 'jumped', 'jumpedov', 'over', 'some', 'thing', 'something'])
  const actual = wordBreak(word, dict)
  const expected = ['jumped', 'over', 'some', 'thing']
  t.deepEqual(actual, expected)
})

const wordBreak = (w, dict) => {
  const map = init(w.length)
  for (let len = 1; len <= w.length; len++) {
    for (let from = 0; from <= w.length - len; from++) {
      const to = from + len - 1
      const part = w.slice(from, to + 1)
      const res = isAWord(part, dict)
        ? { result: true, from }
        : isCombinedOfWords(from, to, map)
      map[from][to] = res
    }
  }
  return pathFor(w, map)
}

const init = (length) =>
  new Array(length).fill()
    .map((x) => new Array(length).fill({ result: false }))

const isAWord = (w, dict) =>
  dict.has(w)

const isCombinedOfWords = (from, to, map) => {
  for (let splitAt = to; splitAt > from; splitAt--) {
    if (map[from][splitAt].result && map[splitAt + 1][to].result) {
      return { result: true, from: splitAt }
    }
  }
  return { result: false }
}

const pathFor = (w, map) => {
  const path = []
  let to = map.length - 1
  while (true) {
    const { result, from } = map[0][to]
    if (result) {
      path.unshift(w.slice(from === 0 ? 0 : from + 1, to + 1))
      to = from
    }
    if (!result || from === 0) {
      break
    }
  }
  return path
}
