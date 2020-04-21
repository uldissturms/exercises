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
    const len = 4
    const tmp = new Array(len)
    let loc = 0
    let lastRead = 0

    /**
     * @param {character[]} buf Destination buffer
     * @param {number} n Number of characters to read
     * @return {number} The number of actual characters read
     */
    return function(buf, n) {
        let left = n
        let total = 0
        let diff = lastRead - loc // 3 2
        let bI = 0

        if (diff > 0) {
          const take = Math.min(left, diff)

          for (i = 0; i < take; i++) {
            buf[bI++] = tmp[loc++]
          }

          left -= take
          total += take
        }

        while (left > 0) {
          loc = 0
          lastRead = read4(tmp)
          const req = Math.min(left, lastRead)

          for (let i = 0; i < req; i++) {
            buf[bI++] = tmp[i]
            loc++
          }

          left -= req
          total += req

          if (lastRead === 0) {
            return total
          }
        }

        return total
    };
};
