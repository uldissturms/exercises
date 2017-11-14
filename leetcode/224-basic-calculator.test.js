// [https://leetcode.com/problems/basic-calculator]

import test from 'ava'
import {isUndefined, isNotUndefined, not} from './helpers'

test('support single number', t => {
  t.is(calculate('1'), 1)
})

test('1+1 is 2', t => {
  t.is(calculate('1+1'), 2)
})

test('1+2 is 3', t => {
  t.is(calculate('1+2'), 3)
})

test('3-1 is 2', t => {
  t.is(calculate('3-1'), 2)
})

test('muli-digit numbers', t => {
  t.is(calculate('1024-12'), 1012)
})

test('muliple operations', t => {
  t.is(calculate('1024+1-12+30'), 1043)
})

test('whitespaces', t => {
  t.is(calculate('1 +1'), 2)
  t.is(calculate('1+ 1'), 2)
  t.is(calculate('1+1 '), 2)
  t.is(calculate(' 1+1'), 2)
})

test('parentheses', t => {
  t.is(calculate('(1+1)'), 2)
  t.is(calculate('(1 - 3) + (1 + 3)'), 2)
  t.is(calculate('2-(5-6)'), 3)
  t.is(calculate('2-(5-6) '), 3)
  t.is(calculate(' 2-(5-6)'), 3)
  t.is(calculate('2-(5-6-(11-9))'), 5)
  t.is(calculate('2 - ( 5 - 6 - ( 11 - 9 ) )'), 5)
})

const operands = {
  '+': (left, right) => left + right,
  '-': (left, right) => left - right
}

const isNotOperand = c =>
  isUndefined(operands[c])

const isParen = c =>
  c === '(' || c === ')'

const isNotParen = not(isParen)

const isEmpty = c =>
  c === ' '

const skipEmptyCharacters = (start, input) => {
  let offset = start
  while (isEmpty(input[offset])) {
    offset++
  }

  return offset
}

const offsetFor = c => (start, input) => {
  let offset = skipEmptyCharacters(start, input)
  if (input[offset] === c) {
    return offset
  }

  return undefined
}

const startsScope = offsetFor('(')
const endsScope = offsetFor(')')

const parseParameter = (start, input) => {
  let param = ''
  let offset = start
  while (isNotOperand(input[offset]) && isNotParen(input[offset]) && offset < input.length) {
    param += input[offset]
    offset++
  }

  return {value: parseInt(param), offset}
}

const parameterAt = (start, input) => {
  const scopeStartOffset = startsScope(start, input)
  return isUndefined(scopeStartOffset)
    ? parseParameter(start, input)
    : calculateScope(scopeStartOffset + 1, input)
}

const OPERAND_LENGTH = 1

const calculate = input =>
  calculateScope(0, input).value

const calculateScope = (start, input) => {
  let {value, offset} = parameterAt(start, input)
  while (offset < input.length) {
    const scopeEndOffset = endsScope(offset, input)
    if (isNotUndefined(scopeEndOffset)) {
      return {value, offset: scopeEndOffset + 1}
    }

    offset = skipEmptyCharacters(offset, input)
    if (offset >= input.length) {
      return {value, offset}
    }

    const operand = operands[input[offset]]
    const right = parameterAt(offset + OPERAND_LENGTH, input)
    value = operand(value, right.value)
    offset = right.offset
  }

  return {value, offset}
}
