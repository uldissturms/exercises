// Credits: http://blog.ploeh.dk/2015/01/10/diamond-kata-with-fscheck/ - Mark Seemann

import test from 'ava'
import {
  map,
  filter,
  not,
  isNotEmpty,
  compose,
  head,
  tail,
  last,
  all,
  reverse,
  skipWhile,
  randomOf,
  firstIndex,
  lastIndex,
  isLetter,
  isNotLetter
} from '../helpers'

const letter = randomOf('ABCDEFGHIJKLMNOPQRSTUVWXYZ')

test('diamond is non-empty', t => {
  t.true(isNotEmpty(diamond(letter)))
})

test('first row contains A', t => {
  const d = diamond(letter)
  t.is(compose(trim, head, splitLF)(d), 'A')
})

test('last row contains A', t => {
  const d = diamond(letter)
  t.is(compose(trim, last, splitLF)(d), 'A')
})

test('all rows have symmetric contour', t => {
  const d = diamond(letter)
  t.true(
    compose(
      all(x => leadingSpaces(x) === trailingSpaces(x)),
      map(withoutLF),
      splitLF
    )(d)
  )
})

test('rows contain the correct letter in the correct order', t => {
  const d = diamond(letter)
  const l = letters('A', letter)
  t.deepEqual(
    compose(map(head), map(trim), splitLF)(d),
    [...l, ...compose(tail, reverse)(l)]
  )
})

test('as wide as high', t => {
  const d = diamond(letter)
  const height = splitLF(d).length
  t.true(
    compose(
      all(x => x.length === height),
      map(withoutLF),
      splitLF
    )(d)
  )
})

test('all lines except top and bottom have two identical letters', t => {
  const d = diamond(letter)
  t.true(
    compose(
      all(isTwoIdenticalLetters),
      filter(not(includes('A'))),
      map(withoutSpaces),
      splitLF
    )(d)
  )
})

test('lower left space is a triangle', t => {
  const d = diamond(letter)
  const dist = distance('A', letter)
  t.deepEqual(
    compose(
      map(x => x.length),
      map(leadingSpaces),
      skipWhile(([x]) => isNotLetter(x)),
      splitLF
    )(d),
    ints(0, dist)
  )
})

test('figure is symmetric around horizontal axis', t => {
  const d = diamond(letter)
  t.deepEqual(
    compose(
      map(withoutLF),
      splitLF
    )(d),
    compose(
      reverse,
      map(withoutLF),
      splitLF
    )(d)
  )
})

const split = c => s => s.split(c)
const splitLF = split('\n')
const replace = (x, y) => s => s.replace(new RegExp(x, 'g'), y)
const withoutLF = replace('\\n', '')
const withoutSpaces = replace(' ', '')
const trim = s => s.trim()
const includes = c => s => s.includes(c)
const isTwoIdenticalLetters = s =>
  s.length === 2 && s[0] === s[1]

const leadingSpaces = s =>
  s.substring(0, firstIndex(isLetter)(s))

const trailingSpaces = s =>
  s.substring(lastIndex(isLetter)(s) + 1)

const toCharCode = c =>
  c.charCodeAt(0)

const fromCharCode = c =>
  String.fromCharCode(c)

const letters = (s, e, l = []) =>
  toCharCode(s) > toCharCode(e)
    ? l
    : letters(fromCharCode(toCharCode(s) + 1), e, [...l, s])

const ints = (s, e, l = []) =>
  s > e
    ? l
    : ints(s + 1, e, [...l, s])

const distance = (s, e) =>
  toCharCode(e) - toCharCode(s)

const join = c => xs =>
  xs.join(c)

const spaces = t =>
  new Array(t).fill(' ').join('')

const makeLine = d => (s, i) => {
  const padding = spaces(d - i)
  return s === 'A'
    ? padding + s + padding
    : padding + s + spaces(i * 2 - 1) + s + padding
}

const diamond = l => {
  const s = 'A'
  const d = distance(s, l)
  return compose(
    join('\n'),
    xs => [...xs, ...compose(tail, reverse)(xs)],
    map(makeLine(d))
  )(letters(s, l))
}
