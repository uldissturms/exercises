const LRUCache = require('./lru-cache')

const random = () =>
  Math.floor(Math.random() * 100)

const times = 50

module.exports = {
  [`${times} cache sets & gets`]: () => {
    const capacity = 10
    const cache = new LRUCache(capacity)
    for (let i = 0; i < times; i++) {
      const key = random()
      const value = `value_for_key_${key}`
      cache.put(key, value)
      cache.get(key)
      cache.put(key, 'update_value')
    }
  }
}
