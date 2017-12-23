import test from 'ava'
import {isUndefined, isNotUndefined, head, last} from '../helpers'

const node = (data, node1, node2) => ({
  data,
  node1,
  node2
})

const node5 = node('5')
const node15 = node('15')
const node10 = node('10', node5, node15)
const node25 = node('25')
const node35 = node('35')
const node30 = node('30', node25, node35)
const node20 = node('20', node10, node30)
const node80 = node('80')
const node70 = node('70', undefined, node80)
const node45 = node('45')
const node50 = node('50', node45)
const node60 = node('60', node50, node70)
const node40 = node('40', node20, node60)

const root = node40

test('tree to doubly linked list', t => {
  const [left, right] = transform(root)
  t.is(left, node5)
  t.is(right, node80)
  t.is(node5.node1, undefined)
  t.is(node5.node2, node10)
  t.is(node10.node1, node5)
  t.deepEqual(walkFwd(left), [
    node5, node10, node15, node20, node25, node30, node35, node40, node45, node50, node60, node70, node80
  ])
  t.deepEqual(walkBck(right), [
    node80, node70, node60, node50, node45, node40, node35, node30, node25, node20, node15, node10, node5
  ])
})

const walk = fn => n => {
  const path = []
  while (isNotUndefined(n)) {
    path.push(n)
    n = fn(n)
  }
  return path
}

const walkFwd = walk(n => n.node2)
const walkBck = walk(n => n.node1)

const link = (left, n, right) => {
  if (isNotUndefined(left)) {
    n.node1 = left
    left.node2 = n
  }
  if (isNotUndefined(right)) {
    n.node2 = right
    right.node1 = n
  }
}

const transform = n => {
  if (isUndefined(n)) {
    return []
  }

  const left = transform(n.node1)
  const right = transform(n.node2)
  link(last(left), n, head(right))
  return [head(left) || n, last(right) || n]
}
