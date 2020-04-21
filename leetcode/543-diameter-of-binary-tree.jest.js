// [https://leetcode.com/problems/diameter-of-binary-tree]

test('solve', () => {
  expect(
    solve({
      val: 1,
      left: {
        val: 2,
        left: {
          val: 4
        },
        right: {
          val: 5
        }
      },
      right: {
        val: 3
      }
    })
  ).toEqual(3)
  expect(solve(undefined)).toEqual(0)
  expect(solve({ val: 1 })).toEqual(0)
  expect(
    solve({
      val: 1,
      left: {
        val: 2
      }
    })
  ).toEqual(1)
})

const solve = n => {
  const dfs = n => {
    if (n == null) {
      return [0, 0]
    }

    const [lm, lh] = dfs(n.left)
    const [rm, rh] = dfs(n.right)

    const h = Math.max(lh, rh) + 1
    const m = Math.max(lh + rh + 1, lm, rm, 1)

    return [m, h]
  }

  const [b] = dfs(n)
  return Math.max(0, b - 1)
}
