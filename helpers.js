const isUndefined = obj =>
  typeof obj === 'undefined'

const not = fn => (...val) =>
  !fn(...val)

const isNotUndefined = not(isUndefined)

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

module.exports = {
  isUndefined,
  isNotUndefined,
  not,
  flatMap,
  head,
  last,
  prop
}
