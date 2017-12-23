const {isUndefined} = require('../helpers')

// TODO: implement proper hashing function
const hashForKey = key => key

const link = (left, right) => {
  if (left) {
    left.next = right
  }
  if (right) {
    right.prev = left
  }
}

class LRUList {
  setHead (node) {
    if (isUndefined(this.head)) {
      this.head = node
      this.tail = node
    } else {
      this.head.prev = node
      node.next = this.head
      node.prev = undefined
      this.head = node
    }
  }
  insert (obj) {
    const node = Object.assign({}, obj)
    this.setHead(node)
    return node
  }
  moveToHead (node) {
    if (node === this.head) {
      return
    }

    if (node === this.tail) {
      this.tail = node.prev
    }

    link(node.prev, node.next)
    this.setHead(node)
  }
  removeTail () {
    const node = this.tail
    if (isUndefined(node.prev)) {
      this.head = undefined
      this.tail = undefined
    } else {
      this.tail = node.prev
      this.tail.next = undefined
    }
    return node
  }
}
class LRUCache {
  constructor (capacity = 1000) {
    this.capacity = capacity
    this.map = new Map()
    this.lru = new LRUList()
  }
  getNode (hash) {
    if (!this.map.has(hash)) {
      return undefined
    }

    const node = this.map.get(hash)
    this.lru.moveToHead(node)
    return node
  }
  get (key) {
    const hash = hashForKey(key)
    return (this.getNode(hash) || {}).value
  }
  update (node, value) {
    node.value = value
  }
  insert (hash, value) {
    const node = this.lru.insert({hash, value})
    this.map.set(hash, node)
  }
  enforceCapacity () {
    if (this.capacity <= this.map.size) {
      const node = this.lru.removeTail()
      this.map.delete(node.hash)
    }
  }
  put (key, value) {
    const hash = hashForKey(key)
    const node = this.getNode(hash)
    if (isUndefined(node)) {
      this.enforceCapacity()
      this.insert(hash, value)
    } else {
      this.update(node, value)
    }
  }
}

module.exports = LRUCache
