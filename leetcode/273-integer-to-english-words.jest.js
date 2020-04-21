// [https://leetcode.com/problems/integer-to-english-words]

test('solve', () => {
  expect(solve(0)).toEqual('Zero')
  expect(solve(1)).toEqual('One')
  expect(solve(2)).toEqual('Two')
  expect(solve(3)).toEqual('Three')
  expect(solve(9)).toEqual('Nine')

  expect(solve(10)).toEqual('Ten')
  expect(solve(11)).toEqual('Eleven')
  expect(solve(12)).toEqual('Twelve')
  expect(solve(19)).toEqual('Nineteen')

  expect(solve(20)).toEqual('Twenty')
  expect(solve(23)).toEqual('Twenty Three')
  expect(solve(30)).toEqual('Thirty')
  expect(solve(90)).toEqual('Ninety')

  expect(solve(100)).toEqual('One Hundred')
  expect(solve(101)).toEqual('One Hundred One')
  expect(solve(121)).toEqual('One Hundred Twenty One')

  expect(solve(123)).toEqual('One Hundred Twenty Three')
  expect(solve(12345)).toEqual('Twelve Thousand Three Hundred Forty Five')
  expect(solve(1234567)).toEqual(
    'One Million Two Hundred Thirty Four Thousand Five Hundred Sixty Seven'
  )
  expect(solve(1234567891)).toEqual(
    'One Billion Two Hundred Thirty Four Million Five Hundred Sixty Seven Thousand Eight Hundred Ninety One'
  )

  // negative
  expect(solve(-1)).toEqual('Negative One')
  expect(solve(-121)).toEqual('Negative One Hundred Twenty One')
})

/*

intuition:

Billions
Millions
Thousands
Hundreds
Tens
Ones

solution:

123

test b -> + Billion
test m -> + Million
test t -> + Thousand
test h -> to number (multiplier, hundred) + Hundred
test t -> to number (number)
test o -> One, Two, Three...
*/

const ones = [
  'Zero',
  'One',
  'Two',
  'Three',
  'Four',
  'Five',
  'Six',
  'Seven',
  'Eight',
  'Nine'
]

const tens = {
  1: 'Ten',
  2: 'Twenty',
  3: 'Thirty',
  4: 'Forty',
  5: 'Fifty',
  6: 'Sixty',
  7: 'Seventy',
  8: 'Eighty',
  9: 'Ninety'
}

const teens = {
  10: 'Ten',
  11: 'Eleven',
  12: 'Twelve',
  13: 'Thirteen',
  14: 'Fourteen',
  15: 'Fifteen',
  16: 'Sixteen',
  17: 'Seventeen',
  18: 'Eighteen',
  19: 'Nineteen'
}

const ps = [[9, 'Billion'], [6, 'Million'], [3, 'Thousand'], [2, 'Hundred']]

const solve = n => {
  const toNumber = n => {
    let x = n
    const res = []

    if (x < 10) {
      return [ones[x]]
    }

    while (x > 0) {
      for (const [p, w] of ps) {
        const m = Math.pow(10, p)
        const ts = Math.floor(x / m)
        if (ts > 0) {
          res.push(...toNumber(ts), w)
        }
        x -= m * ts
      }

      if (x >= 20) {
        const m = 10
        const ts = Math.floor(x / m)
        res.push(tens[ts])
        x -= m * ts
      }

      if (x >= 10) {
        res.push(teens[x])
        return res
      }

      if (x > 0) {
        res.push(ones[x])
        return res
      }
    }

    return res
  }

  const prefix = n < 0 ? ['Negative'] : []

  return [...prefix, ...toNumber(Math.abs(n))].join(' ')
}
