// [https://leetcode.com/problems/evaluate-reverse-polish-notation]

const test = require('ava')
const {isNotUndefined} = require('../helpers')

test('RPN - 1', t => {
  t.is(evalRPN(['2', '1', '+', '3', '*']), 9)
})

test('RPN - 2', t => {
  t.is(evalRPN(['4', '13', '5', '/', '+']), 6)
})

test('RPN - 3', t => {
  t.is(evalRPN(['10', '6', '9', '3', '+', '-11', '*', '/', '*', '17', '+', '5', '+']), 22)
})

const ops = {
  '+': (x, y) => x + y,
  '-': (x, y) => x - y,
  '*': (x, y) => x * y,
  '/': (x, y) => Math.trunc(x / y)
}

const isOp = x => isNotUndefined(ops[x])

const evalRPN = arr => {
  const stack = []
  for (let i = 0; i < arr.length; i++) {
    const cur = arr[i]
    if (isOp(cur)) {
      const y = parseInt(stack.pop())
      const x = parseInt(stack.pop())
      stack.push(ops[cur](x, y))
    } else {
      stack.push(cur)
    }
  }
  return parseInt(stack[0])
}
