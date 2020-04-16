// [https://leetcode.com/problems/buddy-strings]

var buddyStrings = function(xs, ys) {
  const xL = xs.length
  const yL = ys.length

  if (xL !== yL) {
    return false
  }

  const is = []

  for (let i = 0; i < xL; i++) {
    if (xs[i] !== ys[i]) {
      is.push(i)
    }

    if (is.length > 2) {
      return false
    }
  }

  if (is.length === 0) {
    return new Set(xs).size < xL
  }

  const [l, h] = is
  if (is.length === 2 && xs[l] === ys[h] && xs[h] === ys[l]) {
    return true
  }

  return false
};


/*

ab ba -> true

abdc abdc -> false

abb abb -> true

if off by 2 then swapping those should make strings equal
if same and 2 letters the same

*/
