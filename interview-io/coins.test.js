/*
  Split coins in a way where the least number of coins are returned
 */

import test from 'ava'

test('coins', t => {
  t.is(numberOfCoins([25, 10, 5, 1], 6), 2)
  t.is(numberOfCoins([25, 10, 1], 31), 4)
  t.is(numberOfCoins([25, 10, 1], 131), 8) // if amount >= lcm take largest coin
})

test('lcm', t => {
  t.is(lcm([25, 10, 5, 1]), 50)
  t.is(lcm([15, 5, 3]), 15)
})

test('multiplesFor', t => {
  t.deepEqual(multiplesFor(2), {2: 1})
  t.deepEqual(multiplesFor(4), {2: 2})
  t.deepEqual(multiplesFor(50), {2: 1, 5: 2})
  t.deepEqual(multiplesFor(15), {3: 1, 5: 1})
  t.deepEqual(multiplesFor(13), {13: 1})
})

const cacheAndReturn = (key, value, cache) => {
  cache[key] = value
  return value
}

// numberOfCoins :: (Number[], Number) -> Number
const numberOfCoins = (nominals, amount, cache = {}) => {
  if (amount === 0) {
    return 0
  }

  if (amount >= lcm(nominals)) {
    const [firstNominal] = nominals
    return numberOfCoins(nominals, amount - firstNominal, cache) + 1
  }

  if (cache[amount]) {
    return cache[amount]
  }

  const validNominals = nominals.filter((x) => x <= amount)

  return cacheAndReturn(
    amount,
    validNominals.reduce((acc, cur) =>
      Math.min(
        acc,
        numberOfCoins(validNominals, amount - cur, cache) + 1
      ),
      Infinity
    ),
    cache
  )
}

/*
 * input: [25, 10, 5, 1], 6
 * output: 2
 *
 * noc([25, 10, 5, 1], 6) + 1 -> min(2, 2) -> 2
 *  noc([5, 1], 1) + 1 -> 1
 *    noc([1], 0) -> 0
 *  noc([5, 1], 5) + 1 -> min(1, 5) -> 1
 *    noc([5, 1], 0) -> 0
 *    noc([5, 1], 4) + 1 -> 4
 *      noc([1], 3) + 1 -> 3
 *        noc([1], 2) + 1 -> 2
 *          noc([1], 1) + 1 -> 1
 *            noc([1], 0) -> 0
 */

const takeBiggest = (x, y) =>
  Object.entries(y).reduce(
    (acc, [key, value]) => Object.assign(
      acc,
      {[key]: Math.max(acc[key] || 0, value)}
    ),
    x
  )

const lcm = (numbers) => {
  const commonMultipliers = numbers.reduce(
    (acc, x) => takeBiggest(acc, multiplesFor(x)),
    {}
  )
  return Object.entries(commonMultipliers).reduce(
    (acc, [key, value]) => acc * (key ** value),
    1
  )
}

const multiplesFor = (x) => {
  let multiples = {}
  let current = x
  for (let i = 2; i <= x; i++) {
    if (dividesBy(current, i)) {
      multiples = incrementKey(i, multiples)
      current /= i
      i--
    }
    if (current === 1) {
      return multiples
    }
  }

  return multiples
}

const dividesBy = (x, y) =>
  Math.ceil(x / y) * y === x

const incrementKey = (key, dict) =>
  Object.assign(
    dict,
    {[key]: (dict[key] || 0) + 1}
  )
