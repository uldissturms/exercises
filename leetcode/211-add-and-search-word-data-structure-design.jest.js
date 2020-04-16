// [https://leetcode.com/problems/add-and-search-word-data-structure-design]

/**
 * Initialize your data structure here.
 */
var WordDictionary = function() {
    this.trie = new Map()
};

/**
 * Adds a word into the data structure.
 * @param {string} word
 * @return {void}
 */
WordDictionary.prototype.addWord = function(word) {
    const len = word.length

    const dfs = (i, n) => {
      if (i === len) {
        n.set(null, null)
        return
      }

      const x = word[i]

      const m = n.get(x) || new Map()
      dfs(i + 1, m)
      n.set(x, m)
    }

    dfs(0, this.trie)
};

/*

addWord 'dad'

dfs(0, {})
  x: d
  dfs(1, {})
    x: a
    dfs(2, {})
      x: d
      dfs(3, {}) -> {null: null}
      {d: {null: null} }
    {a: { d: { null: null }}}
  {d, { a: { d: { null: null }}}}


*/

/**
 * Returns if the word is in the data structure. A word could contain the dot character '.' to represent any one letter.
 * @param {string} word
 * @return {boolean}
 */
WordDictionary.prototype.search = function(word) {
    const len = word.length

    const dfs = (i, n) => {
      if (n == null) {
        return false
      }

      if (i === len) {
        return n.has(null)
      }

      const x = word[i]

      if (x !== '.') {
        return dfs(i + 1, n.get(x))
      }

      for (const [k, v] of n) {
        if (dfs(i + 1, v)) {
          return true
        }
      }

      return false

    }

    return dfs(0, this.trie)
};

/*

search 'dad'

dfs(0, {d: { a: { d: { null: null }}}})
  x: 'd'
  dsf(1, {a: { d: { null: null }}})
    x: 'a'
    dfs(2, { d: { null: null }})
      x: 'd'
      dfs(3, { null: null }) -> true

*/

/**
 * Your WordDictionary object will be instantiated and called as such:
 * var obj = new WordDictionary()
 * obj.addWord(word)
 * var param_2 = obj.search(word)
 */

/*

bad

    b -> a -> d
    d -> a -> d
    m -> a -> d

map {
  b: map { a: map: { d: map { null },
  d: map { a: map: { d: map { null },
  m: map { a: map: { d: map { null },
}

*/
