import test from 'ava'
import { isUndefined } from '../helpers'

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

const pushToArray = (arr) => ({ data }) => {
  arr.push(data)
  return arr
}

test('in-order traversal', t => {
  const arr = []
  inOrder(pushToArray(arr), bst)
  t.deepEqual(
    arr,
    [ 3, 5, 10, 15, 20, 30 ]
  )
})

test('pre-order traversal', t => {
  const arr = []
  preOrder(pushToArray(arr), bst)
  t.deepEqual(
    arr,
    [20, 10, 5, 3, 15, 30]
  )
})

test('post-order traversal', t => {
  const arr = []
  postOrder(pushToArray(arr), bst)
  t.deepEqual(
    arr,
    [3, 5, 15, 10, 30, 20]
  )
})

const inOrder = (fn, node) => {
  if (isUndefined(node)) {
    return
  }

  inOrder(fn, node.left)
  fn(node)
  inOrder(fn, node.right)
}

const preOrder = (fn, node) => {
  if (isUndefined(node)) {
    return
  }

  fn(node)
  preOrder(fn, node.left)
  preOrder(fn, node.right)
}

const postOrder = (fn, node) => {
  if (isUndefined(node)) {
    return
  }

  postOrder(fn, node.left)
  postOrder(fn, node.right)
  fn(node)
}
