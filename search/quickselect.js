const {randomOf} = require('../helpers')

const kth = (leftFn, rightFn) => (arr, k) => {
  if (k <= 0) {
    return undefined
  }

  if (arr.length === 0) {
    return undefined
  }

  const pivot = randomOf(arr)
  const a1 = []
  const a2 = []
  for (const x of arr) {
    if (leftFn(x, pivot)) {
      a1.push(x)
    }
    if (rightFn(x, pivot)) {
      a2.push(x)
    }
  }

  if (k <= a1.length) {
    return kth(leftFn, rightFn)(a1, k)
  } else if (k > (arr.length - a2.length)) {
    return kth(leftFn, rightFn)(a2, k - (arr.length - a2.length))
  }

  return pivot
}

const lessThan = (x, p) => x < p
const greaterThan = (x, p) => x > p

const kthLargest = kth(greaterThan, lessThan)
const kthSmallest = kth(lessThan, greaterThan)

module.exports = {
  kthLargest,
  kthSmallest
}
