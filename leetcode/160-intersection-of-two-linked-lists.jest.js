// [https://leetcode.com/problems/intersection-of-two-linked-lists]

test('solve', () => {
  const c = {
  }
  const a = {
    next: c
  }
  const b = {
    next: c
  }
  const d = {
  }
  const e = {
    next: {
      next: c
    }
  }
  expect(solve(a, b)).toBe(c)
  expect(solve(a, d)).toBe(null)
  expect(solve(a, e)).toBe(c)
  expect(solve(e, a)).toBe(c)
  expect(solve(e, e)).toBe(e)
})

const lengthOf = (node) => {
  let l = 0
  let n = node
  while (n != null) {
    n = n.next
    l++
  }
  return l
}

const solve = (headA, headB) => {

  const aLen = lengthOf(headA)
  const bLen = lengthOf(headB)

  const intersectionFor = (x, y, xLen, yLen) => {
    const diffLen = yLen - xLen
    let xNode = x
    let yNode = y

    for (let i = 0; i < diffLen; i++) {
      yNode = yNode.next
    }

    for (let i = 0; i < xLen; i++) {
      if (yNode === xNode) {
        return yNode
      }

      xNode = xNode.next
      yNode = yNode.next
    }

    return null
  }

  return bLen > aLen ? intersectionFor(headA, headB, aLen, bLen) : intersectionFor(headB, headA, bLen, aLen)
};
