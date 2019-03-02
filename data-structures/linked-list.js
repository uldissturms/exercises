const { isUndefined, isNotUndefined } = require('../helpers')

const linkedList = () => {
  let head = undefined
  let tail = undefined
  return {
    head: () => head,
    tail: () => tail,
    append: (x) => {
      const node = appendToHead(x, head)
      if (isUndefined(head)) {
        tail = head = node
      } else {
        head = node
      }
    }
  }
}

const appendToHead = (x, head) => {
  const node = {
    data: x,
    next: () => head,
    prev: () => undefined
  }

  if (isNotUndefined(head)) {
    head.prev = () => node
  }

  return node
}

module.exports = {
  linkedList
}
