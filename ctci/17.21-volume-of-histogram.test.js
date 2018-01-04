import test from 'ava'
import {Heap} from '../data-structures/heaps'
import {isUndefined, isNotUndefined} from '../helpers'

test('calculates the volume of water held', t => {
  t.is(histogram([0, 0, 4, 0, 0, 6, 0, 0, 3, 0, 5, 0, 1, 0, 0, 0]), 26) // book
  t.is(histogram([0, 0, 4, 0, 0, 6, 0, 0, 3, 0, 8, 0, 2, 0, 5, 2, 0, 3, 0, 0]), 46) // adv
  t.is(histogram([]), 0)
  t.is(histogram([0]), 0)
  t.is(histogram([1]), 0)
  t.is(histogram([0, 1]), 0)
  t.is(histogram([1, 0]), 0)
  t.is(histogram([1, 0, 1]), 1)
  t.is(histogram([1, 1]), 0)
  t.is(histogram([1, 1, 1]), 0)
})

const histogram = items =>
  sum(toBars(items))

const bar = (index, height) => ({
  index,
  height
})

const greaterByHeight = (x, y) =>
  x.height > y.height

const isABar = x =>
  x > 0

const toBars = items => {
  const ranks = new Heap(greaterByHeight)
  const bars = []

  for (let i = 0; i < items.length; i++) {
    if (isABar(items[i])) {
      processBar(bar(i, items[i]), ranks, bars)
    }
  }

  return processUnclosed(ranks, bars)
}

const processBar = (current, ranks, bars) => {
  const top = ranks.peek()
  if (isNotUndefined(top) && current.height >= top.height) {
    bars.push({
      height: Math.min(top.height, current.height),
      length: current.index - top.index - 1
    })
    ranks.pop()
  }

  ranks.insert(current)
}

const processUnclosed = (ranks, bars) => {
  while (true) {
    const current = ranks.pop()
    const next = ranks.peek()

    if (isUndefined(current)) {
      return bars
    }

    if (isUndefined(next)) {
      return bars
    }

    processUnclosedRank(current, next, ranks, bars)
  }
}

const processUnclosedRank = (current, next, ranks, bars) => {
  if (isUndefined(next)) {
    return
  }

  if (next.index < current.index) {
    bars.push({
      height: next.height,
      length: -1
    })
    ranks.pop()
    return processUnclosedRank(current, ranks.peek(), ranks, bars)
  }

  bars.push({
    height: Math.min(current.height, next.height),
    length: next.index - current.index - 1
  })
}

const sum = bars =>
  bars.reduce((acc, {height, length}) => acc + (height * length), 0)
