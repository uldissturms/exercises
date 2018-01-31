// [https://leetcode.com/problems/serialize-and-deserialize-binary-tree]

import test from 'ava'
import {isUndefined, isNotUndefined, isNull, isNotNull, head, last} from '../helpers'

function TreeNode (val) {
  this.val = val
  this.left = NULL_VAL
  this.right = NULL_VAL
}

const NULL_VAL = null

const node = (val, left = NULL_VAL, right = NULL_VAL) => {
  const n = new TreeNode(val)
  n.left = left
  n.right = right
  return n
}

const treeWithNulls = node(1,
  node(2),
  node(3,
    node(4),
    node(5)
  )
)

test('serialize tree as an array', t => {
  t.deepEqual(serialize(treeWithNulls), '[1,2,3,null,null,4,5]')
  t.deepEqual(serialize(node(2)), '[2]')
  t.deepEqual(serialize(node(3, node(4), node(5))), '[3,4,5]')
  t.deepEqual(serialize(NULL_VAL), '[]')
})

test('deserialize array as a tree', t => {
  t.deepEqual(deserialize('[1,2,3,null,null,4,5]'), treeWithNulls)
  t.deepEqual(deserialize('[1,2,3]'), node(1, node(2), node(3)))
  t.deepEqual(deserialize('[]'), NULL_VAL)
  t.deepEqual(deserialize('[null]'), NULL_VAL)
})

const complexTree = node(5,
  node(2),
  node(3, node(2, node(3), node(1)), node(4))
)

const unbalancedLeftTree = node(1,
  node(2,
    node(3,
      node(4,
        node(5)
      )
    )
  )
)

const unbalancedRightTree = node(1,
  NULL_VAL,
  node(2,
    NULL_VAL,
    node(3,
      NULL_VAL,
      node(4,
        NULL_VAL,
        node(5)
      )
    )
  )
)

test('serialize and deserialize', t => {
  t.deepEqual(deserialize(serialize(treeWithNulls)), treeWithNulls)
  t.deepEqual(deserialize(serialize(complexTree)), complexTree)
  t.deepEqual(deserialize(serialize(unbalancedLeftTree)), unbalancedLeftTree)
  t.deepEqual(deserialize(serialize(unbalancedRightTree)), unbalancedRightTree)
})

// O (n) where n - number of nodes
const serialize = node => {
  const queue = [node]
  const nodes = []
  while (queue.length > 0) {
    const current = queue.shift()
    nodes.push((current || {}).val)
    if (isNotNull(current)) {
      queue.push(current.left)
      queue.push(current.right)
    }
  }
  return JSON.stringify(trimUndefinied(nodes))
}

const trimUndefinied = nodes => {
  while (nodes.length > 0 && isUndefined(last(nodes))) {
    nodes.pop()
  }

  return nodes
}

// O (n) where n - number of nodes
const deserialize = val =>
  toTree(JSON.parse(val))

const toTree = nodes => {
  if (nodes.length === 0) {
    return NULL_VAL
  }

  const root = nodeFor(head(nodes))
  if (isUndefined(root)) {
    return NULL_VAL
  }

  processNodes([root], nodes, 1)
  return root
}

const processNodes = (expanded, nodes, offset) => {
  if (offset >= nodes.length) {
    return
  }

  const next = []
  let index = offset
  for (let node of expanded) {
    const children = childrenFor(index, nodes)
    const [left, right] = children
    node.left = left || NULL_VAL
    node.right = right || NULL_VAL
    next.push(...children.filter(isNotUndefined))
    index += 2
  }

  return processNodes(next, nodes, index)
}

const childrenFor = (index, nodes) => {
  const left = nodeFor(nodes[index])
  const right = nodeFor(nodes[index + 1])
  return [left, right]
}

const nodeFor = val => {
  if (isUndefined(val)) {
    return val
  }

  if (isNull(val)) {
    return undefined
  }

  return node(val)
}
