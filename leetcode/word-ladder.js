const head = ([x]) =>
  x

const isUndefined = obj =>
  typeof obj === 'undefined'

const not = fn => (...val) =>
  !fn(...val)

const isNotUndefined = not(isUndefined)

const pathTo = (type, word, discovered) => {
  let path = []
  let prev
  let current = word
  while (current !== prev) {
    prev = current
    path = [current, ...path]
    current = discovered[current][type]
  }
  return path
}

const reverse = items => {
  items.reverse()
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

const discover = (state, discovered) => {
  discovered[state.current.word] = Object.assign({}, discovered[state.current.word], {[state.type]: state.current.from})

  const toBeDiscovered = wordsOneTransformationAwayFrom(
    state.current.word,
    state.undiscoveredKeys
  )

  return withTrackingInfo(state.current.word, state.current.level + 1, toBeDiscovered)
}

const next = state => {
  state.current = state.queue.shift()
}

const pathsCrossed = ({current}, discovered) =>
  isNotUndefined(current) &&
    isNotUndefined(discovered[current.word]) &&
    isNotUndefined(discovered[current.word].start) &&
    isNotUndefined(discovered[current.word].end)

const buildPathFrom = ({word}, discovered) => {
  const {start, end} = discovered[word]
  const path = []
  path.push(...pathTo('start', start, discovered))
  if (start !== word && end !== word) {
    path.push(word)
  }
  path.push(...reverse(pathTo('end', end, discovered)))
  return path
}

const words = objects =>
  objects.map(({word}) => word)

const discoverLevel = (state, discovered) => {
  const level = state.current.level
  let paths = []
  const toBeDiscovered = []

  while (isNotUndefined(state.current) && state.current.level === level) {
    const children = discover(state, discovered)
    toBeDiscovered.push(...children)
    state.queue.push(...children)
    if (pathsCrossed(state, discovered)) {
      const path = buildPathFrom(state.current, discovered)
      paths = [...paths, path]
    }
    next(state)
  }

  if (toBeDiscovered.length > 0) {
    markAsDiscovered(words(toBeDiscovered), state.undiscovered)
    state.undiscoveredKeys = Object.keys(state.undiscovered)
    state.levels[level + 1] = toBeDiscovered.length
  }

  return paths
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
