// [https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal]

/*
manually:

    3
   / \
  9  20
    /  \
   15   7

[
  [3],
  [20, 9],
  [15, 7]
]

*/

/*
solve:
1. init level array
2. perform BFS with each level alternating the order in which we add all children to result array
*/

test('solve', () => {
  expect(solve(undefined)).toEqual([])
  expect(solve({ val: 1 })).toEqual([[1]])
  expect(solve({ val: 1, left: { val: 3 }, right: { val: 2 } })).toEqual([
    [1],
    [2, 3]
  ])
  expect(solve({
    val: 1,
    left: {
      val: 3
    },
    right: {
      val: 2,
      left: {
        val: 4,
      },
      right: {
        val: 5
      }
    }
  })).toEqual([
    [1],
    [2, 3],
    [4, 5],
  ])
})

const solve = n => {
  if (n == null) {
    return []
  }

  const res = [[n.val]]

  let q = [n]
  let children = []
  let ltr = false

  while (q.length > 0) {
    const cur = q.shift()
    children.push(...[cur.left, cur.right].filter(x => x))
    if (q.length === 0 && children.length > 0) {
      const transform = ltr ? x => x : x => x.reverse()
      const level = children.map(x => x.val)
      res.push(transform(level))
      ltr = !ltr
      q = children
      children = []
    }
  }

  return res
}
