import test from 'ava'
import {
  height,
  insert,
  insertAndTrackHeight,
  leftRotate,
  rightRotate,
  fixParent
} from './BST'

const bst = {
  data: 20,
  left: {
    data: 10,
    left: {
      data: 5,
      left: {
        data: 3
      }
    },
    right: {
      data: 15
    }
  },
  right: {
    data: 30
  }
}

test('insert root node', t => {
  const root = { data: 0 }
  const x = insert()(root, undefined)
  t.deepEqual(x, root)
})

test('insert left node', t => {
  const root = { data: 2 }
  const node = { data: 1 }
  const x = insert()(node, root)
  t.deepEqual(x, { data: 2, left: node })
})

test('insert right node', t => {
  const root = { data: 2 }
  const node = { data: 3 }
  const x = insert()(node, root)
  t.deepEqual(x, { data: 2, right: node })
})

test('insert recursively', t => {
  const node = { data: 7 }
  t.is(insert()(node, bst).left.left.right, node)
})

test('insert and track height', t => {
  const node = { data: 2 }
  insertAndTrackHeight(node, undefined)
  t.is(node.height, 0)
  insertAndTrackHeight({ data: 1 }, node)
  t.is(node.height, 1)
  insertAndTrackHeight({ data: 3 }, node)
  t.is(node.height, 1)
  insertAndTrackHeight({ data: 4 }, node)
  t.is(node.height, 2)
})

const nodeA = { data: 'A' }
const nodeB = { data: 'B' }
const nodeC = { data: 'C' }

test('left rotate', t => {
  const nodeY = {
    data: 'Y',
    left: nodeB,
    right: nodeC
  }
  const nodeX = {
    data: 'X',
    left: nodeA,
    right: nodeY
  }

  leftRotate(nodeX)

  t.is(nodeX.left, nodeA)
  t.is(nodeX.right, nodeB)
  t.is(nodeY.left, nodeX)
  t.is(nodeY.right, nodeC)
})

test('left rotate with parent', t => {
  const nodeY = {
    data: 'Y',
    left: nodeB,
    right: nodeC
  }
  const nodeX = {
    data: 'X',
    left: nodeA,
    right: nodeY
  }
  const root = {
    data: 'R',
    left: nodeX
  }
  nodeX.parent = root

  leftRotate(nodeX)

  t.is(nodeX.left, nodeA)
  t.is(nodeX.right, nodeB)
  t.is(nodeX.parent, nodeY)
  t.is(nodeY.left, nodeX)
  t.is(nodeY.right, nodeC)
  t.is(root.left, nodeY)
})

test('right rotate', t => {
  const nodeX = {
    data: 'X',
    left: nodeA,
    right: nodeB
  }
  const nodeY = {
    data: 'Y',
    left: nodeX,
    right: nodeC
  }

  rightRotate(nodeY)

  t.is(nodeY.left, nodeB)
  t.is(nodeY.right, nodeC)
  t.is(nodeX.left, nodeA)
  t.is(nodeX.right, nodeY)
})

test('right rotate with parent', t => {
  const nodeX = {
    data: 'X',
    left: nodeA,
    right: nodeB
  }
  const nodeY = {
    data: 'Y',
    left: nodeX,
    right: nodeC
  }
  const root = {
    data: 'R',
    left: nodeY
  }
  nodeY.parent = root

  rightRotate(nodeY)

  t.is(nodeY.left, nodeB)
  t.is(nodeY.right, nodeC)
  t.is(nodeY.parent, nodeX)
  t.is(nodeX.left, nodeA)
  t.is(nodeX.right, nodeY)
  t.is(nodeX.parent, root)
})

test('fix parent - no parent', t => {
  const a = { data: 'A' }
  const b = { data: 'B' }

  fixParent(a, b)

  t.is(a.parent, b)
})

test('fix parent - left parent', t => {
  const a = { data: 'A' }
  const b = { data: 'B' }
  const r = { data: 'R', left: a }
  a.parent = r

  fixParent(a, b)

  t.is(a.parent, b)
  t.is(b.parent, r)
  t.is(r.left, b)
})

test('fix parent - right parent', t => {
  const a = { data: 'A' }
  const b = { data: 'B' }
  const r = { data: 'R', right: a }
  a.parent = r

  fixParent(a, b)

  t.is(a.parent, b)
  t.is(b.parent, r)
  t.is(r.right, b)
})

test('calculate height of a node', t => {
  t.is(height({ data: 0 }), 0)
  t.is(height({ data: 0, left: { height: 0 } }), 1)
  t.is(height({ data: 0, left: { height: 1 } }), 2)
  t.is(height({ data: 0, right: { height: 0 } }), 1)
  t.is(height({ data: 0, left: { height: 1 }, right: { height: 0 } }), 2)
})
