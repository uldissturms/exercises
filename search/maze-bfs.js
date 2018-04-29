const {isNotUndefined} = require('../helpers')
const {eq, keyFor, childrenFor} = require('./maze')

const search = (start, end, maze) => {
  const extended = {}
  const q = [start]
  let level = 0
  while (q.length > 0) {
    const res = extendLevel(end, maze, level, q, extended)
    if (isNotUndefined(res)) {
      return res
    }
    level += 1
  }
  return undefined
}

const extendLevel = (end, maze, level, q, extended) => {
  let length = q.length
  for (let i = length; i > 0; i--) {
    const current = q.shift()
    if (extended[keyFor(current)]) {
      continue
    }
    if (eq(current, end)) {
      return level
    }

    extended[keyFor(current)] = true
    q.push(...childrenFor(current, maze))
  }

  return undefined
}

module.exports = search
