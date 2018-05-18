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

const tail = arr =>
  arr.slice(1)

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
  return obj
}

const path = (arr, obj) => {
  if (isUndefined(obj)) {
    return obj
  }

  if (arr.length === 1) {
    return obj[head(arr)]
  }

  return path(tail(arr), obj[head(arr)])
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

const flattenBy = fn => arr =>
  arr.reduce(
    (acc, cur) => fn(cur)
      ? [...acc, ...flattenBy(fn)(cur)]
      : [...acc, cur],
    []
  )

const isArray = x => Array.isArray(x)
const flatten = flattenBy(isArray)

const plus = (acc, cur) => acc + cur
const sum = arr => arr.reduce(plus, 0)

module.exports = {
  isUndefined,
  isNull,
  isNotUndefined,
  isNotNull,
  isUndefinedOrEmpty,
  not,
  flatMap,
  head,
  tail,
  last,
  prop,
  path,
  set,
  traverseTree,
  isEmpty,
  flatten,
  flattenBy,
  isArray,
  sum
}
