import test from 'ava'
import { compose, isUndefined } from '../helpers'
import {
  insert as bstInsert,
  trackHeight,
  DEFAULT_HEIGHT_NODE,
  leftRotate,
  rightRotate
} from './BST'

test('keeps tree in balance', t => {
  const node20 = { data: 20 }
  const node10 = { data: 10 }
  const node30 = { data: 30 }
  const node5 = { data: 5 }
  const node15 = { data: 15 }
  const node12 = { data: 12 }

  const root = node20

  insert(root, undefined)
  t.is(root.height, 0)

  insert(node10, root)
  t.is(node10.height, 0)
  t.is(root.height, 1)

  insert(node30, root)
  t.is(node30.height, 0)
  t.is(root.height, 1)

  insert(node5, root)
  insert(node15, root)
  t.is(root.height, 2)

  insert(node12, root)

  // assert tree structure
  t.is(node15.left, node10)
  t.is(node15.right, node20)

  t.is(node10.left, node5)
  t.is(node10.right, node12)

  t.is(node20.left, undefined)
  t.is(node20.right, node30)

  // assert tree heights
  t.is(node15.height, 2)
  t.is(node10.height, 1)
  t.is(node20.height, 1)
  t.is(node5.height, 0)
  t.is(node12.height, 0)
  t.is(node30.height, 0)
})

const fixLeftHeavy = (x) => {
  const { left } = x

  // Left Right Shape
  if (left.right.height > left.left.height) {
    trackHeightOfNodeAndParent(leftRotate(left))
  }

  // Left Left Shape
  return trackHeightOfNodeAndParent(rightRotate(x))
}

const fixRightHeavy = (x) => {
  const { right } = x

  // Right Left Shape
  if (right.left.height > right.right.height) {
    trackHeightOfNodeAndParent(rightRotate(right))
  }

  // Right Right Shape
  return trackHeightOfNodeAndParent(leftRotate(x))
}

const fixAVLProperty = (x) => {
  const {
    left = DEFAULT_HEIGHT_NODE,
    right = DEFAULT_HEIGHT_NODE
  } = x

  const diff = left.height - right.height

  if (diff === 2) {
    return fixLeftHeavy(x)
  }

  if (diff === -2) {
    return fixRightHeavy(x)
  }

  return x
}

// AVL:
// 1. simple BST insert
// 2. fix AVL property
const avl = compose(
  fixAVLProperty,
  trackHeight
)

const trackHeightOfParent = (x) => {
  if (isUndefined(x.parent)) {
    return x
  }

  trackHeight(x.parent)
  return x
}

const trackHeightOfNodeAndParent = compose(
  trackHeightOfParent,
  trackHeight
)

const insert = (node, to) => {
  return bstInsert(avl)(node, to)
}
