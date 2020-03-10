/*

    20
  10   30
5  15 25 35

seconds largest = 1st largest +
* largest in left tree of 1st largest if exists
* parent if exists otherwise
*/

test('solve', () => {
  // basics
  expect(solve({ val: 20 })).toEqual(undefined)
  expect(solve({ val: 20, left: { val: 10 } })).toEqual(10)
  expect(solve({ val: 20, left: { val: 10 }, right: { val: 30 } })).toEqual(20)

  // deeper search
  // full tree
  expect(
    solve({
      val: 20,
      left: {
        val: 10,
        left: { val: 5 },
        right: { val: 15 },
      },
      right: { val: 30,
        left: {
          val: 25,
        },
        right: {
          val: 35
        },
      }
    })
  ).toEqual(30)

  // skewed tree
  expect(
    solve({
      val: 20,
      left: {
        val: 10,
        left: { val: 5 },
        right: { val: 15 },
      },
    })
  ).toEqual(15)
})

const solve = n => {
  const largest = (n, p) => {
    if (n === undefined) {
      return undefined
    }

    return largest(n.right, n) || [n, p]
  }

  const [l, pl] = largest(n, undefined)
  const [sl] = largest(l.left, l) || [pl]

  return sl && sl.val
}
