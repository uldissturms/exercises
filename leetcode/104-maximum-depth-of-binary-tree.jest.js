// [https://leetcode.com/problems/maximum-depth-of-binary-tree]

test('solve', () => {
  expect(maxDepth(null)).toBe(0)
  expect(maxDepth({
    val: 1,
    left: {
      val: 2,
      left: {
        val: 3,
      }
    }
  })).toBe(3)
})
const maxDepth = root => {
  if (root == null) {
    return 0
  }

  return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1
}
