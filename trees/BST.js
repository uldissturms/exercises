const { isUndefined, id } = require('../helpers')

const DEFAULT_HEIGHT = -1
const DEFAULT_HEIGHT_NODE = { height: DEFAULT_HEIGHT }

const height = (node) => {
  const {
    left = DEFAULT_HEIGHT_NODE,
    right = DEFAULT_HEIGHT_NODE
  } = node
  return Math.max(left.height, right.height) + 1
}

const insert = (fn = id) => (node, to) => {
  if (isUndefined(to)) {
    return fn(node)
  }

  if (node.data <= to.data) {
    const left = insert(fn)(node, to.left)
    to.left = left
  } else {
    const right = insert(fn)(node, to.right)
    to.right = right
  }

  return fn(to)
}

const trackHeight = (x) => {
  x.height = height(x)
  return x
}

const insertAndTrackHeight = insert(trackHeight)

const leftRotate = (node) => {
  const { right } = node
  node.right = right.left
  right.left = node
}

const rightRotate = (node) => {
  const { left } = node
  node.left = left.right
  left.right = node
}

module.exports = {
  height,
  trackHeight,
  insert,
  insertAndTrackHeight,
  leftRotate,
  rightRotate
}
