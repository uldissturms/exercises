// [https://leetcode.com/problems/read-n-characters-given-read4]

test('solve', () => {

  const read4 = (xs, offset) => {
    const len = xs.length
    let loc = offset

    return (buf) => {
      let bI = 0

      let diff = len - loc // loc: 0 len: 1 -> 1, loc: 1, len: 1 -> 0
      let toRead = Math.min(4, len - loc)

      for (let i = 0; i < toRead; i++) {
        buf[i] = xs[loc + i]
      }

      loc += toRead

      return toRead
    }
  }

  let read
  let buf

  // read all string
  read = solution(read4('abc', 0))
  buf = new Array(4)

  expect(read(buf, 3)).toEqual(3)
  expect(buf.join('')).toEqual('abc')

  // read more than string
  read = solution(read4('abc', 0))
  buf = new Array(4)

  expect(read(buf, 4)).toEqual(3)
  expect(buf.join('')).toEqual('abc')

  // read less than string
  read = solution(read4('abc', 0))
  buf = new Array(4)

  expect(read(buf, 2)).toEqual(2)
  expect(buf.join('')).toEqual('ab')

  // read in two goes
  read = solution(read4('abc', 0))
  buf = new Array(4)

  expect(read(buf, 2)).toEqual(2)
  expect(buf.join('')).toEqual('ab')
  expect(read(buf, 2)).toEqual(1)
  expect(buf.join('')).toEqual('cb')

  read = solution(read4('abc', 0))
  buf = new Array(4)

  expect(read(buf, 0)).toEqual(0)
  expect(buf.join('')).toEqual('')

  expect(read(buf, 1)).toEqual(1)
  expect(buf.join('')).toEqual('a')

  expect(read(buf, 2)).toEqual(2)
  expect(buf.join('')).toEqual('bc')

  // examples

  // mix of reading from file + buffer + file

  read = solution(read4('abcde', 0))
  buf = new Array(4)

  expect(read(buf, 1)).toEqual(1)
  expect(buf.join('')).toEqual('a')

  expect(read(buf, 4)).toEqual(4)
  expect(buf.join('')).toEqual('bcde')

  // mulitple reads from file

  let input = 'abcdefghijklmnopqrstuvwxyz'
  read = solution(read4(input, 0))
  buf = new Array(input.length)

  expect(read(buf, 20)).toEqual(20)
  expect(buf.join('')).toEqual(input.substring(0, 20))
})

var solution = function(read4) {
  let buffer = new Array(4)
  let pos = 0
  let lastRead = 0

  return function(buf, n) {
    let cur = 0
    let bI = 0

    while (cur < n) {
      while (cur < n && lastRead > 0 && pos < lastRead) {
        buf[bI++] = buffer[pos++]
        cur++
      }

      if (cur === n) {
        return cur
      }

      pos = 0
      lastRead = read4(buffer)

      if (lastRead === 0) {
        return cur
      }
    }

    return cur
  }
}

