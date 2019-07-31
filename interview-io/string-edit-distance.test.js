import test from 'ava'

const assert = require('assert')

// TODO: reimplement memoizeWith myself in helpers
const { memoizeWith } = require('ramda')

// equal
test('distance - equal', t => {
  t.is(distance('abc', 'abc'), 0)
})

// insert
test('distance - insert at the end', t => {
  t.is(distance('abcx', 'abc'), 1)
})

test('distance - insert at the beginning', t => {
  t.is(distance('xabc', 'abc'), 1)
})

test('distance - insert in the middle', t => {
  t.is(distance('axbc', 'abc'), 1)
})

// delete
test('distance - delete at the end', t => {
  t.is(distance('ab', 'abc'), 1)
})

test('distance - delete at the beginning', t => {
  t.is(distance('bc', 'abc'), 1)
})

test('distance - delete in the middle', t => {
  t.is(distance('ac', 'abc'), 1)
})

// replace
test('distance - replace at the end', t => {
  t.is(distance('abx', 'abc'), 1)
})

test('distance - replace at the beginning', t => {
  t.is(distance('xbc', 'abc'), 1)
})

test('distance - replace in the middle', t => {
  t.is(distance('axc', 'abc'), 1)
})

// all modifications
test('distance - insert, delete and replace', t => {
  t.is(distance('abcdef', 'acxefy'), 3)
})

const assertCharComp = (x) =>
  assert.ok(x.length === 1, `Expected single char comparisson only, got: ${x}`)

const charDiff = (a, b) => {
  assertCharComp(a)
  assertCharComp(b)
  return a === b ? 0 : 1
}

const withArgs = (...args) => args

// distance :: (string, string, number, number) -> number
const distance = memoizeWith(withArgs, (a, b, aIdx = 0, bIdx = 0) => {
  if (aIdx >= a.length) {
    return b.length - bIdx
  }

  if (bIdx >= b.length) {
    return a.length - aIdx
  }

  return Math.min(...[
    distance(a, b, aIdx + 1, bIdx + 1),
    distance(a, b, aIdx + 1, bIdx),
    distance(a, b, aIdx, bIdx + 1)
  ]) + charDiff(a[aIdx], b[bIdx])
})
