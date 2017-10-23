const {transform} = require('./word-ladder')
const fiveCharWords = require('./126-word-ladder-words-5-chars.data')

module.exports = {
  'long list with 127 shortest paths': () => {
    transform('zings', 'brown', fiveCharWords.words)
  }
}
