// [https://leetcode.com/problems/binary-search-tree-iterator]

test('solve', () => {
  let node
  let bst

  node = { val: 1 }
  bst = new BSTIterator(node)

  expect(bst.hasNext()).toEqual(true)
  expect(bst.hasNext()).toEqual(true)
  expect(bst.hasNext()).toEqual(true)
  expect(bst.next()).toEqual(node.val)
  expect(bst.hasNext()).toEqual(false)
  expect(bst.hasNext()).toEqual(false)
  expect(bst.next()).toEqual(undefined)

  node = {
    val: 2,
    left: {
      val: 1
    },
    right: {
      val: 3
    }
  }
  bst = new BSTIterator(node)

  expect(bst.hasNext()).toEqual(true)
  expect(bst.next()).toEqual(1)
  expect(bst.next()).toEqual(2)
  expect(bst.next()).toEqual(3)
  expect(bst.next()).toEqual(undefined)

  bst = new BSTIterator(undefined)

  expect(bst.next()).toEqual(undefined)
  expect(bst.hasNext()).toEqual(false)
  expect(bst.next()).toEqual(undefined)
})

// generator
function gen(r) {
  const dfs = function*(n) {
    if (n == null) {
      return
    }

    yield* dfs(n.left)
    yield n.val
    yield* dfs(n.right)
  }

  return dfs(r)
}

var BSTIteratorG = function(root) {
  this.iter = gen(root)
}

BSTIteratorG.prototype.next = function() {
  if (this.nextItem == null) {
    this.nextItem = this.iter.next()
  }

  const { value } = this.nextItem

  this.nextItem = undefined

  return value
}

BSTIteratorG.prototype.hasNext = function() {
  if (this.nextItem == null) {
    this.nextItem = this.iter.next()
  }

  return !this.nextItem.done
}

const addNodesToStack = (n, stack) => {
  while (n) {
    stack.push(n)
    n = n.left
  }
}

// stack
var BSTIteratorS = function(root) {
  this.stack = []
  addNodesToStack(root, this.stack)
}

BSTIteratorS.prototype.next = function() {
  const n = this.stack.pop()

  if (n && n.right) {
    addNodesToStack(n.right, this.stack)
  }

  return n && n.val
}

BSTIteratorS.prototype.hasNext = function() {
  return this.stack.length > 0
}

BSTIterator = BSTIteratorG
