import test from 'ava'

test('count missing brackets', t => {
  t.is(countMissingBrackets('(()'), 1)
  t.is(countMissingBrackets('(())'), 0)
  t.is(countMissingBrackets('())('), 2)
})

const countMissingBrackets = (s) => {
  let count = 0
  let final = 0
  for (let i = 0; i < s.length; i++) {
    const c = s[i]
    if (c === '(') {
      count++
    } else {
      if (count > 0) {
        count--
      } else {
        final++
      }
    }
  }
  return count + final
}
