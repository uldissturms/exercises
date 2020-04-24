test('solve', () => {
  expect(solve(undefined)).toEqual(undefined)

  const single = { val: 1 }
  expect(solve(single)).toEqual(single)

  const tree = {
    val: 4,
    left: {
      val: 2,
      left: {
        val: 1
      },
      right: {
        val: 3
      }
    },
    right: {
      val: 5
    }
  }
  const head = solve(tree)

  expect(head.val).toEqual(1)
  expect(head.left.val).toEqual(5)

  expect(head.right.val).toEqual(2)
  expect(head.right.left.val).toEqual(1)

  expect(head.right.right.val).toEqual(3)
  expect(head.right.right.left.val).toEqual(2)

  expect(head.right.right.right.val).toEqual(4)
  expect(head.right.right.right.left.val).toEqual(3)

  expect(head.right.right.right.right.val).toEqual(5)
  expect(head.right.right.right.right.left.val).toEqual(4)

  expect(head.right.right.right.right.right.val).toEqual(1)
})

const solve = r => {
  let head
  let current
  const process = n => {
    if (current) {
      current.right = n
      n.left = current
    }
    if (head == null) {
      head = n
    }
    current = n
  }
  const dfs = n => {
    if (n == null) {
      return
    }
    dfs(n.left)
    process(n)
    dfs(n.right)
  }
  dfs(r)
  // link head and tail (current)
  if (head != null) {
    head.left = current
    current.right = head
  }
  return head
}
