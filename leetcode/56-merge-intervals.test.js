// [https://leetcode.com/problems/merge-intervals]

const test = require('ava')
const {isNotUndefined, clone, prop, sortBy} = require('../helpers')

test('merge two arrays where start of second is less than end of previous', t => {
  t.deepEqual(
    merge([[1, 3], [2, 6], [8, 10], [15, 18]].map(([x, y]) => toInterval(x, y))),
    [[1, 6], [8, 10], [15, 18]].map(([x, y]) => toInterval(x, y))
  )
})

test('merge two arrays where start of second is equal to the end of previous', t => {
  t.deepEqual(
    merge([[1, 4], [4, 5]].map(([x, y]) => toInterval(x, y))),
    [[1, 5]].map(([x, y]) => toInterval(x, y))
  )
})

test('merge two unsorted arrays', t => {
  t.deepEqual(
    merge([[1, 4], [0, 4]].map(([x, y]) => toInterval(x, y))),
    [[0, 4]].map(([x, y]) => toInterval(x, y))
  )
})

test('merge works for empty array', t => {
  t.deepEqual(merge([]), [])
})

const toInterval = (start, end) => ({
  start,
  end
})

const sortByStart = sortBy(x => prop('start', x))

const merge = xs => {
  const res = []
  for (const x of sortByStart(xs)) {
    const last = res[res.length - 1]
    if (isNotUndefined(last) && overlaps(last, x)) {
      last.end = Math.max(last.end, x.end)
    } else {
      res.push(clone(x))
    }
  }

  return res
}

const overlaps = (x, y) =>
  x.start <= y.end && y.start <= x.end
