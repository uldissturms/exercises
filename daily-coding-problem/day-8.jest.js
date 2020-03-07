/*
   0
  / \
 1   0
    / \
   1   0
  / \
 1   1


 manually:

    0 x
  / \
 1v  0 x
x x / \
   1 v   0 v
  / \   x x
 1v   1v
x x  x x

output: 5

diff between nothing (undefined) and not matching
each call returns value and whether or not all values below it match

*/

/*
solve:
1. determine values for children and whether their subtrees are unival trees
2. return current node tree and whether or not the value is unival (same as children and both children the same if defined)
3. keep track of count (sum of children unival trees + 1 if the parent is unival tree)
*/

test('solve', () => {
  expect(
    solve({
      val: 0
    })
  ).toBe(1)
  expect(
    solve({
      val: 0,
      left: {
        val: 0
      }
    })
  ).toBe(2)
  expect(
    solve({
      val: 0,
      left: {
        val: 0
      },
      right: {
        val: 0
      }
    })
  ).toBe(3)
  expect(
    solve({
      val: 0,
      left: {
        val: 1
      }
    })
  ).toBe(1)
  expect(
    solve({
      val: 0,
      left: {
        val: 1
      }
    })
  ).toBe(1)
  expect(
    solve({
      val: 0,
      left: {
        val: 0
      },
      right: {
        val: 1
      }
    })
  ).toBe(2)
  expect(
    solve({
      val: 0,
      left: {
        val: 1
      },
      right: {
        val: 0,
        left: {
          val: 1,
          left: {
            val: 1
          },
          right: {
            val: 1
          }
        },
        right: {
          val: 0
        }
      }
    })
  ).toBe(5)
})

const isUndefined = x => typeof x === 'undefined'

const solve = n => {
  // n -> [val, unival, count]
  const dfs = n => {
    if (n == null) {
      return [undefined, true, 0]
    }

    const [lVal, lUnival, lCount] = dfs(n.left)
    const [rVal, rUnival, rCount] = dfs(n.right)

    const unival =
      lUnival
      && rUnival
      && (isUndefined(lVal) || n.val === lVal)
      && (isUndefined(rVal) || n.val === rVal)

    return [n.val, unival, lCount + rCount + (unival ? 1 : 0)]
  }

  const [, , count] = dfs(n)
  return count
}
