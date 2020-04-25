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

var BSTIterator = function(root) {
  this.iter = gen(root)
}

/**
 * @return the next smallest number
 * @return {number}
 */
BSTIterator.prototype.next = function() {
  if (this.nextItem == null) {
    this.nextItem = this.iter.next()
  }

  const { value } = this.nextItem

  this.nextItem = undefined

  return value
}

/**
 * @return whether we have a next smallest number
 * @return {boolean}
 */
BSTIterator.prototype.hasNext = function() {
  if (this.nextItem == null) {
    this.nextItem = this.iter.next()
  }

  return !this.nextItem.done
}
