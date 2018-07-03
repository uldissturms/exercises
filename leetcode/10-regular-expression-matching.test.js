// [https://leetcode.com/problems/regular-expression-matching]

import test from 'ava'
import {lastIndex} from '../helpers'

test('match whole string', t => {
  t.true(match('aa', 'aa'))
})

test('not matching the whole string', t => {
  t.false(match('a', 'aa'))
  t.false(match('aaa', 'aaaa'))
  t.false(match('aaaa', 'aaa'))
})

test('wildcard match', t => {
  t.true(match('a*', 'aa'))
  t.true(match('a*a', 'aaa'))
})

test('wildcard match unlimited times', t => {
  t.true(match('a*', 'aaa'))
  // t.true(match('ab*a*c*a', 'aaa'))
})

test('wildcard match zero times', t => {
  t.true(match('c*a*b*', 'ab'))
})

test('not matching wildcard', t => {
  t.false(match('mis*is*p*.', 'mississippi'))
})

test('any character', t => {
  t.true(match('.', 'a'))
})

test('any character multiple times', t => {
  t.true(match('.*', 'abc'))
})

test('character terminates wildcard for match', t => {
  t.true(match('a.*cc', 'acc'))
  t.true(match('a.*cc', 'abcc'))
})

test('character terminates wildcard for no-match', t => {
  t.false(match('a.*cc', 'abc'))
  t.false(match('.*bc', 'abb'))
})

const match = (p, s, ip = 0, is = 0, reason = 'start') => {
  if (is === s.length) {
    return ip === p.length ||
      (ip === p.length - 1 && isWildcard(p[ip]))
  }

  if (ip >= p.length) {
    return false
  }

  if (charMatch(p[ip], s[is])) {
    return match(p, s, ip + 1, is + 1, 'char')
  }

  if (wildcardMatch(p, s, ip, is)) {
    return match(p, s, ip, is + 1, 'wild-take') ||
      match(p, s, ip + 1, is + 1, 'wild-take-move-on') ||
      match(p, s, ip + 1, is - 1, 'wild-pass-1')
  }

  // ignore wildcard
  if (isWildcard(p[ip])) {
    return match(p, s, ip + 1, is, 'wild-fail-1')
  }

  if (isWildcard(p[ip + 1])) {
    return match(p, s, ip + 2, is, 'wild-fail-2')
  }

  return false
}

const charMatch = (p, c) =>
  p === ANY_CHAR || p === c

const wildcardMatch = (p, s, ip, is) =>
  p[ip] === WILDCARD &&
    charMatch(
      lastChar(p, Math.min(p.length - 1, ip)),
      s[is]
    )

const ANY_CHAR = '.'
const WILDCARD = '*'

const isWildcard = c => c === WILDCARD

const isLetterOrDot = c => /([a-z]|\.)/.test(c)
const lastChar = (s, i) =>
  s[lastIndex(isLetterOrDot)(s, i)]
