const head = ([x]) =>
  x

const flatMap = (fn, items) => {
  const res = []
  for (let item of items) {
    res.push(...fn(item))
  }

  return res
}

const equal = (left, right) =>
  left.length === right.length && left.every((l, i) => l === right[i])

const unique = items => {
  const res = []
  for (let item of items) {
    if (!res.some(r => equal(r, item))) {
      res.push(item)
    }
  }

  return res
}

const isUndefined = obj =>
  typeof obj === 'undefined'

const not = fn => (...val) =>
  !fn(...val)

const isNotUndefined = not(isUndefined)

const reverse = items => {
  for (let item of items) {
    item.reverse()
  }

  return items
}

const oneTransformationAway = (begin, end) => {
  if (begin.length !== end.length) {
    return false
  }

  let singleDifference = false
  for (let i = 0; i < begin.length; i++) {
    if (begin[i] !== end[i]) {
      if (singleDifference) {
        return false
      }
      singleDifference = true
    }
  }

  return singleDifference
}

const wordsOneTransformationAwayFrom = (word, words) =>
  words
    .filter(w => oneTransformationAway(word, w))

const withTrackingInfo = (from, level, words) =>
  words.map(word => ({word, from, level}))

const markAsDiscovered = (words, dict) => {
  for (let word of words) {
    delete dict[word]
  }
}

const toMap = items => {
  const map = {}
  for (let item of items) {
    map[item] = true
  }
  return map
}

const init = (type, word, undiscovered) => {
  markAsDiscovered([word], undiscovered)

  return {
    type,
    queue: [],
    current: {word, from: word, level: 0},
    undiscovered,
    undiscoveredKeys: Object.keys(undiscovered),
    levels: {0: 1}
  }
}

const assocPath = (path, value, object) => {
  const current = path[0]

  if (path.length === 1) {
    object[current] = value
    return object
  }

  if (isUndefined(object[current])) {
    object[current] = {}
  }

  return assocPath(path.slice(1), value, object[current])
}

const path = (value, object) => {
  if (isUndefined(object)) {
    return undefined
  }

  const current = value[0]

  if (value.length === 1) {
    return object[current]
  }

  return path(value.slice(1), object[current])
}

const discover = ({type, current, undiscoveredKeys}, discovered) => {
  const {word, level, from} = current
  const alreadyDiscoveredFrom = path([word, type], discovered) || []
  if (alreadyDiscoveredFrom.includes(from)) {
    return []
  }

  assocPath(
    [word, type],
    [...alreadyDiscoveredFrom, from],
    discovered
  )

  const toBeDiscovered = wordsOneTransformationAwayFrom(
    word,
    undiscoveredKeys
  )

  return withTrackingInfo(word, level + 1, toBeDiscovered)
}

const next = state => {
  state.current = state.queue.shift()
}

const pathsCrossed = ({current}, discovered) =>
  isNotUndefined(current) &&
    isNotUndefined(discovered[current.word]) &&
    isNotUndefined(discovered[current.word].start) &&
    isNotUndefined(discovered[current.word].end)

const product = (left, right) =>
  flatMap(r => left.map(l => [...r, ...l]), right)

const pathsTo = (type, words, discovered) => {
  if (words.length === 1 && equal(discovered[head(words)][type], words)) {
    return [words]
  }

  return flatMap(
    w => pathsTo(type, discovered[w][type], discovered).map(p => [...p, w]),
    words
  )
}

const buildPathsFrom = (word, discovered) => {
  const {start, end} = discovered[word]
  let paths = pathsTo('start', start, discovered)
  if (!equal(start, [word]) && !equal(end, [word])) {
    paths = paths.map(p => [...p, word])
  }
  return product(reverse(pathsTo('end', end, discovered)), paths)
}

const words = objects =>
  objects.map(({word}) => word)

const discoverLevel = (state, discovered) => {
  const {level} = state.current
  let paths = []
  const toBeDiscovered = []

  while (isNotUndefined(state.current) && state.current.level === level) {
    const children = discover(state, discovered)
    toBeDiscovered.push(...children)
    state.queue.push(...children)
    if (pathsCrossed(state, discovered)) {
      paths = [...paths, ...buildPathsFrom(state.current.word, discovered)]
    }
    next(state)
  }

  if (toBeDiscovered.length > 0) {
    markAsDiscovered(words(toBeDiscovered), state.undiscovered)
    state.undiscoveredKeys = Object.keys(state.undiscovered)
    state.levels[level + 1] = toBeDiscovered.length
  }

  return unique(paths)
}

const shortest = paths => {
  let answer = []
  let min = Number.MAX_VALUE
  for (let path of paths) {
    if (path.length < min) {
      min = path.length
      answer = []
    }

    if (path.length === min) {
      answer = [...answer, path]
    }
  }

  return answer
}

const levels = (state, fallback = Number.MAX_VALUE) => {
  if (isUndefined(state.current)) {
    return fallback
  }

  if (isUndefined(state.levels[state.current.level])) {
    return fallback
  }

  return state.levels[state.current.level]
}

const transform = (startWord, endWord, wordList) => {
  if (!wordList.includes(endWord)) {
    return []
  }

  const discovered = {}
  const fromStart = init('start', startWord, toMap(wordList))
  const fromEnd = init('end', endWord, toMap(wordList))

  while (isNotUndefined(fromStart.current) || isNotUndefined(fromEnd.current)) {
    const toDiscover = levels(fromStart) < levels(fromEnd) ? fromStart : fromEnd
    const paths = discoverLevel(toDiscover, discovered)
    if (paths.length > 0) {
      return shortest(paths)
    }
  }

  return []
}

module.exports = {
  transform,
  discoverLevel,
  init,
  toMap,
  head
}
