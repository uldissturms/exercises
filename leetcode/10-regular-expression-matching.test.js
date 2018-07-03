// [https://leetcode.com/problems/regular-expression-matching]

import test from 'ava'

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
  t.true(match('ab*a*c*a', 'aaa'))
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

const parse = (p, i = 0, r = []) => {
  if (i >= p.length) {
    return r
  }

  const char = p[i]

  if (isWildcard(p[i + 1])) {
    return parse(p, i + 2, [...r, {
      fn: charMatch(char),
      type: WILDCARD
    }])
  }

  return parse(p, i + 1, [...r, {
    fn: charMatch(char),
    type: char
  }])
}

const match = (p, s) =>
  isMatch(parse(p), s)

const isMatch = (p, s, ip = 0, is = 0, reason = 'start') => {
  if (is === s.length) {
    return ip === p.length ||
      (ip === p.length - 1 && isWildcard(p[ip].type))
  }

  if (ip >= p.length) {
    return false
  }

  const c = s[is]
  const {fn, type} = p[ip]
  if (isWildcard(type)) {
    return (fn(c) && isMatch(p, s, ip, is + 1, 'wild-match')) ||
      isMatch(p, s, ip + 1, is, 'wild-skip')
  }

  return fn(c) && isMatch(p, s, ip + 1, is + 1, 'char-match')
}

const charMatch = p => c =>
  p === ANY_CHAR || p === c

const ANY_CHAR = '.'
const WILDCARD = '*'

const isWildcard = c => c === WILDCARD
