// [https://leetcode.com/problems/pancake-sorting]

test('solve', () => {
  ;[
    [],
    [1],
    [1, 2],
    [2, 1],
    [1, 2, 3],
    [3, 2, 1],
    [1, 3, 2],
    [1, 3, 1],
    [3, 2, 4, 1],
    [3, 1, 2, 4, 6, 5],
    [10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
    [ 10, 9, 8, 6, 7, 5, 4, 3, 2, 1, 9, 10, 8, 7, 6, 5, 4, 3, 2, 1, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1 ]
  ].forEach(xs => {
    expect(flipped(solve([...xs]), [...xs])).toEqual([...xs].sort((x, y) => x - y))
  })
})

const flipped = (flips, xs) => {

  for (const f of flips) {
    flip(f - 1, xs)
  }

  return xs
}

const flip = (k, xs) => {
  const mid = Math.floor(k / 2)
  for (let i = 0; i <= mid; i++) {
    ;[xs[i], xs[k - i]] = [xs[k - i], xs[i]]
  }
}

// O(N^2)
// for every length
//   find max
//   if max is not at the current length
//     swap max with beginning
//     swap beginning with length
const solve = xs => {
  const len = xs.length

  const max = i => {
    let mI = 0
    for (let j = 0; j <= i; j++) {
      if (xs[j] > xs[mI]) {
        mI = j
      }
    }

    return mI
  }

  const res = []

  for (let i = len - 1; i > 0; i--) {
    const mI = max(i)
    if (mI !== i) {
      flip(mI, xs)
      flip(i, xs)
      res.push(mI + 1)
      res.push(i + 1)
    }
  }

  return res
}
