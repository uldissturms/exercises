// [https://leetcode.com/problems/diameter-of-binary-tree]

test('solve', () => {
  expect(diameterOfBinaryTree({
    val: 1,
    left: {
      val: 2,
      left: {
        val: 4
      },
      right: {
        val: 5,
      },
    },
    right: {
      val: 3
    }
  })).toEqual(3)
})

const diameterOfBinaryTree = (root) => {
  const [b] = solve(root)
  return Math.max(0, b - 1)
};

const solve = (n) => {
  if (n == null) {
    return [0, 0]
  }

  const [lm, lh] = solve(n.left)
  const [rm, rh] = solve(n.right)

  const h = Math.max(lh, rh) + 1
  const m = Math.max((lh + rh + 1), lm, rm, 1)

  return [m, h]
}

