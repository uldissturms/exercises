// [https://leetcode.com/problems/valid-parentheses]

test('valid', () => {
  // single pair
  expect(validate('{}')).toBe(true)
  expect(validate('[]')).toBe(true)
  expect(validate('()')).toBe(true)
  // two pairs
  expect(validate('()()')).toBe(true)
  expect(validate('(())')).toBe(true)
  // mix of bracket types
  expect(validate('[()]')).toBe(true)
  expect(validate('[({})]')).toBe(true)
  expect(validate('[]{}()')).toBe(true)
})

test('invalid', () => {
  expect(validate('{')).toEqual(false)
  expect(validate('[')).toEqual(false)
  expect(validate('(')).toEqual(false)
  expect(validate('}')).toEqual(false)
  expect(validate(']')).toEqual(false)
  expect(validate(')')).toEqual(false)
  expect(validate(')(')).toEqual(false)
  expect(validate('}{')).toEqual(false)
  expect(validate('][')).toEqual(false)
  expect(validate('[}')).toEqual(false)
  expect(validate('{[{]}')).toEqual(false)
})

const pairs = {
'}': '{',
']': '[',
')': '('
}

const indices = {
'{': 0,
'[': 1,
'(': 2,
}

const isUndefined = x => typeof x === 'undefined'

const validate = (s) => {
  const counts = new Array(Object.keys(indices).length).fill(0)
  const opended = []

  for (const c of s) {
    const start = pairs[c]
    const closing = !isUndefined(start)
    const starting = !closing
    const index = closing ? indices[start] : indices[c]
    const change = closing ? -1 : 1
    const count = counts[index] + change
    counts[index] = count

    if (count < 0) {
      // console.log('more closing brackets')
      return false
    }

    if (starting) {
      opended.push(c)
    }

    if (closing) {
      const lastOpened = opended.pop()
      if (lastOpened !== start) {
        // console.log(`wrong closing bracket: ${c} - ${lastOpened}`)
        return false
      }
    }
    // console.log(start, c, counts)
  }

  for (const c of counts) {
    if (c !== 0) {
      // console.log('unclosed brackets')
      return false
    }
  }

  return true
}
