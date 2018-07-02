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
const isNotEmpty = not(isEmpty)

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

const compose = (...fns) => obj =>
  fns.reduceRight((acc, cur) => cur(acc), obj)

const all = fn => xs =>
  xs.reduce((acc, cur) => acc && fn(cur), true)

const reverse = l => {
  if (l.length === 0) {
    return l
  }

  const [x, ...xs] = l
  return [...reverse(xs), x]
}

const map = fn => xs =>
  xs.map(fn)

const filter = fn => xs =>
  xs.filter(fn)

const snd = ([x, y]) => y
const skipWhile = fn =>
  compose(
    snd,
    xs => xs.reduce(
      ([s, l], c) => s && fn(c)
        ? [true, []]
        : [false, [...l, c]],
      [true, []]
    )
  )

const random = (min, max) =>
  Math.floor(Math.random() * (max - min) + min)
const randomOf = xs =>
  xs[random(0, xs.length)]

const firstIndex = f => s => {
  for (let i = 0; i < s.length; i++) {
    if (f(s[i])) {
      return i
    }
  }
}

const lastIndex = f => (s, ix = s.length - 1) => {
  for (let i = ix; i >= 0; i--) {
    if (f(s[i])) {
      return i
    }
  }
}

const isLetter = c => /[A-Z]/.test(c)
const isLowerLetter = c => /[a-z]/.test(c)
const isNotLetter = not(isLetter)

module.exports = {
  isUndefined,
  isNull,
  isNotUndefined,
  isNotNull,
  isNotEmpty,
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
  sum,
  compose,
  all,
  reverse,
  map,
  filter,
  skipWhile,
  randomOf,
  firstIndex,
  lastIndex,
  isLetter,
  isNotLetter,
  isLowerLetter
}
