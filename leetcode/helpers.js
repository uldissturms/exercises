const isUndefined = obj =>
  typeof obj === 'undefined'

const not = fn => (...val) =>
  !fn(...val)

const isNotUndefined = not(isUndefined)

const head = ([x]) =>
  x

const flatMap = (fn, items) => {
  const res = []
  for (let item of items) {
    res.push(...fn(item))
  }

  return res
}

module.exports = {
  isUndefined,
  isNotUndefined,
  not,
  flatMap,
  head
}
