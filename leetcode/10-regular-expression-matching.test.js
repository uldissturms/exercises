// [https://leetcode.com/problems/regular-expression-matching]

import test from 'ava'
import {last, lastIndex, isLowerLetter} from '../helpers'

test('match whole string', t => {
  t.true(match('aa', 'aa'))
})

test('not matching the whole string', t => {
  t.false(match('a', 'aa'))
})

test('repeating character should match', t => {
  t.true(match('a*', 'aa'))
})

test('repeating character should match unlimited times', t => {
  t.true(match('a*', 'aaa'))
})

const match = (p, s, ip = 0, is = 0) => {
  if (is > s.length) {
    return true
  }

  return satisfies(p, s, ip, is)
    ? match(p, s, ip + 1, is + 1)
    : false
}

const WILDCARD = '*'

const satisfies = (p, s, ip, is) =>
  p[ip] === s[is] ||
    (p[ip] === WILDCARD && lastChar(p, ip) === s[is]) ||
    (ip >= p.length && last(p) === WILDCARD && lastChar(p) === s[is])

const lastChar = (s, i) =>
  s[lastIndex(isLowerLetter)(s, i)]
