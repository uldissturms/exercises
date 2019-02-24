import test from 'ava'
import { insertAndTrackHeight } from './BST'

test('keeps tree in balance', t => {
  const node20 = { data: 20 }
  const node10 = { data: 10 }
  const node30 = { data: 30 }
  const node5 = { data: 5 }
  const node15 = { data: 15 }
  const node12 = { data: 15 }

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

  // TODO: implement rebalancing
  t.is(root.height, 3)
})

// AVL:
// 1. simple BST insert
// 2. fix AVL property
const insert = (node, to) => {
  return insertAndTrackHeight(node, to)
}
