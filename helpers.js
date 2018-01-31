const isUndefined = obj =>
  typeof obj === 'undefined'

const isNull = obj =>
  obj === null

const isEmpty = obj =>
  obj === ''

const isUndefinedOrEmpty = obj =>
  isUndefined(obj) || isEmpty(obj)

const not = fn => (...val) =>
  !fn(...val)

const isNotUndefined = not(isUndefined)
const isNotNull = not(isNull)

const head = ([x]) =>
  x

const last = items => {
  if (isUndefined(items)) {
    return items
  }

  return items[items.length - 1]
}

const flatMap = (fn, items) => {
  const res = []
  for (let item of items) {
    res.push(...fn(item))
  }

  return res
}

const prop = (name, obj) => {
  if (isUndefined(obj)) {
    return obj
  }

  return obj[name]
}

const set = (name, obj) => val => {
  obj[name] = val
}

const indent = 4
const traverseTree = (n, level = 0) => {
  if (isUndefined(n)) {
    return
  }
  traverseTree(n.left, level + 1)
  console.log(new Array(level * indent).join(' '), n.data)
  traverseTree(n.right, level + 1)
}

module.exports = {
  isUndefined,
  isNull,
  isNotUndefined,
  isNotNull,
  isUndefinedOrEmpty,
  not,
  flatMap,
  head,
  last,
  prop,
  set,
  traverseTree,
  isEmpty
}
