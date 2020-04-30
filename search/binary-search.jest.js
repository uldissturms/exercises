test('solve - binary search standard', () => {
  expect(bs([1, 4, 4, 4, 4, 4, 4, 5, 6, 7], 4)).toEqual(4) // first 4 match
  expect(bs([1], 1)).toEqual(0)
  expect(bs([1, 2], 1)).toEqual(0)
  expect(bs([1, 2], 2)).toEqual(1)
  expect(bs([1, 2, 3], 2)).toEqual(1)
  expect(bs([1, 2, 3], 3)).toEqual(2)
  expect(bs([1, 3, 4], 2)).toEqual(undefined)
})

test('solve - binary search alternative', () => {
  expect(bsa([1, 4, 4, 4, 4, 4, 4, 5, 6, 7], 4)).toEqual(6) // first 4 match (ceil)
  expect(bsa([1], 1)).toEqual(0)
  expect(bsa([1, 2], 1)).toEqual(0)
  expect(bsa([1, 2], 2)).toEqual(1)
  expect(bsa([1, 2, 3], 2)).toEqual(1)
  expect(bsa([1, 2, 3], 3)).toEqual(2)
  expect(bsa([1, 3, 4], 2)).toEqual(undefined)
})

test('solve - binary search lowest', () => {
  expect(bsl([1, 4, 4, 4, 4, 4, 4, 5, 6, 7], 4)).toEqual(1) // lowest 4
  expect(bsl([1], 1)).toEqual(0)
  expect(bsl([1, 2], 1)).toEqual(0)
  expect(bsl([1, 2], 2)).toEqual(1)
  expect(bsl([1, 2, 3], 2)).toEqual(1)
  expect(bsl([1, 2, 3], 3)).toEqual(2)
  expect(bsl([1, 3, 4], 2)).toEqual(undefined)
})

test('solve - binary search highest', () => {
  expect(bsh([1, 4, 4, 4, 4, 4, 4, 5, 6, 7], 4)).toEqual(6) // lowest 4
  expect(bsh([1], 1)).toEqual(0)
  expect(bsh([1, 2], 1)).toEqual(0)
  expect(bsh([1, 2], 2)).toEqual(1)
  expect(bsh([1, 2, 3], 2)).toEqual(1)
  expect(bsh([1, 2, 3], 3)).toEqual(2)
  expect(bsh([1, 3, 4], 2)).toEqual(undefined)
})

const bs = (xs, x) => {
  let l = 0
  let r = xs.length - 1
  while (l <= r) {
    m = Math.floor((l + r) / 2)
    if (xs[m] < x) {
      l = m + 1
    } else if (xs[m] > x) {
      r = m - 1
    } else {
      return m
    }
  }

  return undefined
}

const bsa = (xs, x) => {
  let l = 0
  let r = xs.length - 1
  while (l !== r) {
    m = Math.ceil((l + r) / 2)
    if (xs[m] > x) {
      r = m - 1
    } else {
      l = m
    }
  }

  if (xs[l] === x) {
    return l
  }

  return undefined
}

const bsl = (xs, x) => {
  let l = 0
  let r = xs.length

  while (l < r) {
    m = Math.floor((l + r) / 2)
    if (xs[m] < x) {
      l = m + 1
    } else {
      r = m
    }
  }

  return xs[l] === x ? l : undefined
}

const bsh = (xs, x) => {
  let l = 0
  let r = xs.length

  while (l < r) {
    m = Math.floor((l + r) / 2)
    if (xs[m] > x) {
      r = m
    } else {
      l = m + 1
    }
  }

  return xs[r - 1] === x ? r - 1 : undefined
}
