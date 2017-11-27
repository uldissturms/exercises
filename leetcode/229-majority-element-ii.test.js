import test from 'ava'
import {isUndefined} from './helpers'

test('one majority number', t => {
  t.deepEqual(majority([1, 5, 3, 5]), [5])
  t.deepEqual(majority([1, 2, 2]), [2])
})

test('no majority number', t => {
  t.deepEqual(majority([1, 2, 3]), [])
})

test('two majority numbers', t => {
  t.deepEqual(majority([1, 2, 2, 1, 3]), [2, 1])
  t.deepEqual(majority([3, 2, 1, 2, 1]), [2, 1])
  t.deepEqual(majority([3, 2, 2, 1, 1]), [2, 1])
})

test('sparse data', t => {
  t.deepEqual(majority([5, 2, 5, 4, 5, 6]), [5])
  t.deepEqual(majority([0, 3, 4, 0]), [0])
})

test('majority with 1/4th', t => {
  t.deepEqual(majority([5, 2, 3, 4, 5, 2, 5, 3, 2, 3], 4), [5, 3, 2])
})

test('majority with 1/10 th', t => {
  t.deepEqual(majority([5, 2, 7, 4, 1, 2, 6, 3, 2], 10), [5, 2, 7, 4, 1, 6, 3])
})

const majority = (numbers, weight = 3, majorities = []) => {
  const result = majorityExcept(numbers, weight, majorities)
  if (result.length === 0) {
    return majorities
  }

  return majority(numbers, weight, [...majorities, ...result])
}

const majorityExcept = (numbers, weight, except = [], start = 0) => {
  if (start === numbers.length) {
    return []
  }

  let majority
  let totalNumbers = 0
  let majoritySoFar = 0

  for (let i = start; i < numbers.length; i++) {
    totalNumbers++

    if (numbers[i] === majority) {
      majoritySoFar++
    }

    // reset if majority falls below
    if (majoritySoFar * weight <= totalNumbers) {
      i = backup(numbers, majority, i)
      const current = numbers[i]
      if (except.includes(current)) {
        majority = undefined
        majoritySoFar = 0
      } else {
        majoritySoFar = 1
        majority = current
      }
      totalNumbers = 1
    }
  }

  if (isUndefined(majority)) {
    return []
  }

  return [
    ...(verify(majority, weight, numbers) ? [majority] : []),
    ...majorityExcept(
      numbers,
      weight,
      [...except, majority],
      backup(numbers, majority, numbers.length - 1)
    )
  ]
}

const lastIndexOfMajority = (numbers, majority, i) => {
  while (numbers[i] !== majority) {
    i--
  }

  return i
}

// go back to previous majority to continue
const backup = (numbers, majority, i) => {
  if (isUndefined(majority)) {
    return i
  }

  return lastIndexOfMajority(numbers, majority, i) + 1
}

const verify = (majority, weight, numbers) => {
  let count = 0

  for (let n of numbers) {
    if (n === majority) {
      count++
    }
  }

  return count * weight > numbers.length
}
