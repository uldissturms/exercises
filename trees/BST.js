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

const insert = (fn = id) => (n, p) => {
  if (isUndefined(p)) {
    return fn(n)
  }

  if (n.data <= p.data) {
    const left = insert(fn)(n, p.left)
    left.parent = p
    p.left = left
  } else {
    const right = insert(fn)(n, p.right)
    right.parent = p
    p.right = right
  }

  return fn(p)
}

const trackHeight = (x) => {
  x.height = height(x)
  return x
}

const insertAndTrackHeight = insert(trackHeight)

const fixParent = (n, p) => {
  const { parent } = n
  n.parent = p
  p.parent = parent

  if (isUndefined(parent)) {
    return n
  }

  if (parent.left === n) {
    parent.left = p
    return n
  }

  if (parent.right === n) {
    parent.right = p
    return n
  }

  return n
}

const leftRotate = (n) => {
  const { right: r } = n
  n.right = r.left
  r.left = n
  return fixParent(n, r)
}

const rightRotate = (n) => {
  const { left: l } = n
  n.left = l.right
  l.right = n
  return fixParent(n, l)
}

module.exports = {
  height,
  trackHeight,
  insert,
  insertAndTrackHeight,
  leftRotate,
  rightRotate,
  fixParent,
  DEFAULT_HEIGHT_NODE
}
