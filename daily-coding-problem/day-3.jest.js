/*
Given the root to a binary tree, implement serialize(root), which serializes the tree into a string, and deserialize(s), which deserializes the string back into the tree.

For example, given the following Node class

class Node:
    def __init__(self, val, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right
The following test should pass:

node = Node('root', Node('left', Node('left.left')), Node('right'))
assert deserialize(serialize(node)).left.left.val == 'left.left'
*/

/*
manually:

    1
  2  5
3  4


dfs
serialize:    1, 2, 3, null, null, 4, null, null, 5, null, null
deserialize:              1 (0)
                 2 (1)              5 (8)
          3 (2)    4 (5)         (9)   (10)
        (3) (4) (6) (7)
*/

/*
reasoning:
use dfs to serialize and deserialize nodes. use null values for missing nodes
*/

/*
steps:
* serialize:
   1. traverse tree by using dfs
   2. for each node append value to string
   3. for null nodes apped value of 'null'
* deserialize:
   1. parse string into array
   2. for each item traverse it in a dfs way
      if value != 'null' insert node and continue down left node
      if value == 'null' trackback
*/

const node4 = {
  val: '4'
}

const node3 = {
  val: '3'
}

const node2 = {
  val: '2',
  left: node3,
  right: node4
}

const node5 = {
  val: '5'
}
const node1 = {
  val: '1',
  left: node2,
  right: node5
}

const node1String = '1, 2, 3, null, null, 4, null, null, 5, null, null'

test('serialize', () => {
  expect(serialize(node5)).toEqual('5, null, null')
  expect(serialize(undefined)).toEqual('null')
  expect(serialize(node1)).toEqual(node1String)
})

test('deserialize', () => {
  expect(deserialize('5, null, null')).toEqual(node5)
  expect(deserialize(node1String)).toEqual(node1)
})

test('serialize -> deserialize', () => {
  expect(deserialize(serialize(node1))).toEqual(node1)
})

const DELIMITER = ', '

const NULL = 'null'

const isNil = x => x == null

const serialize = n => buildArray(n).join(DELIMITER)

const buildArray = (n, a = []) => {
  if (isNil(n)) {
    return [...a, NULL]
  }

  const aWithNode = [...a, n.val]
  const aWithLeft = buildArray(n.left, aWithNode)
  return buildArray(n.right, aWithLeft)
}

const deserialize = s => {
  const [n] = toTree(s.split(DELIMITER))
  return n
}

const toTree = (a, p, idx = 0) => {
  const val = a[idx]

  if (val === NULL) {
    return [undefined, idx]
  }

  const n = { val }

  const [l, lIdx] = toTree(a, n, idx + 1)
  const [r, rIdx] = toTree(a, n, lIdx + 1)

  n.left = l
  n.right = r

  return [n, rIdx]
}
