// [https://www.interviewcake.com/question/python/kth-to-last-node-in-singly-linked-list]

test('solve', () => {
  const fifth = {
    data: 5
  }
  const fourth = {
    data: 4,
    next: fifth,
  }
  const third = {
    data: 3,
    next: fourth,
  }
  const second = {
    data: 2,
    next: third,
  }
  const first = {
    data: 1,
    next: second,
  }
  const root = first
  expect(kthToLast(root, 1)).toBe(fifth)
  expect(kthToLast(root, 2)).toBe(fourth)
  expect(kthToLast(root, 5)).toBe(first)
})

test('edge cases', () => {
  expect(() => kthToLast([1], 2)).toThrow(`Not enough elements in list to return last 2 element`)
  expect(() => kthToLast([1], 0)).toThrow(`Cannot get less than the last element`)
  expect(() => kthToLast([1], -1)).toThrow(`Cannot get less than the last element`)
})

/*
manually

1
1 2 3 4 5
        s
        f

2
1 2 3 4 5
    s
        f

*/

/*
reasoning
1. 2 pointers approach
2. use recursion
*/

/*
steps:

1. init pointers to root
2. increment fast pointer from time 0
3. increment slow pointer from kth
4. return slow pointer when fast pointer is at the end (next points to undefined)
*/

const isUndefined = x => typeof x === 'undefined'

const kthToLast = (n, k) => {
  if (k < 1) {
    throw new Error(`Cannot get less than the last element`)
  }

  let s = n
  let f = n

  for (let i = 1; i < k; i++) {
    if (isUndefined(f.next)) {
      throw new Error(`Not enough elements in list to return last ${k} element`)
    }
    f = f.next
  }

  while(!isUndefined(f.next)) {
    f = f.next
    s = s.next
  }
  return s
}
