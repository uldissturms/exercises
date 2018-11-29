// [https://leetcode.com/problems/sudoku-solver]

const test = require('ava')
const {isUndefined} = require('../helpers')

const createInput = () => [
  ['5', '3', '.', '.', '7', '.', '.', '.', '.'],
  ['6', '.', '.', '1', '9', '5', '.', '.', '.'],
  ['.', '9', '8', '.', '.', '.', '.', '6', '.'],
  ['8', '.', '.', '.', '6', '.', '.', '.', '3'],
  ['4', '.', '.', '8', '.', '3', '.', '.', '1'],
  ['7', '.', '.', '.', '2', '.', '.', '.', '6'],
  ['.', '6', '.', '.', '.', '.', '2', '8', '.'],
  ['.', '.', '.', '4', '1', '9', '.', '.', '5'],
  ['.', '.', '.', '.', '8', '.', '.', '7', '9']
]

// example of solved sudoku
// [
//   [ '5', '3', '4', '6', '7', '8', '9', '1', '2' ],
//   [ '6', '7', '2', '1', '9', '5', '3', '4', '8' ],
//   [ '1', '9', '8', '3', '4', '2', '5', '6', '7' ],
//   [ '8', '5', '9', '7', '6', '1', '4', '2', '3' ],
//   [ '4', '2', '6', '8', '5', '3', '7', '9', '1' ],
//   [ '7', '1', '3', '9', '2', '4', '8', '5', '6' ],
//   [ '9', '6', '1', '5', '3', '7', '2', '8', '4' ],
//   [ '2', '8', '7', '4', '1', '9', '6', '3', '5' ],
//   [ '3', '4', '5', '2', '8', '6', '1', '7', '9' ]
// ]

test('returns valid characters', t => {
  const input = createInput()
  t.deepEqual(
    getValidChars(0, 0, input),
    new Set(['1', '2'])
  )
  t.deepEqual(
    getValidChars(0, 1, input),
    new Set(['1', '2', '4'])
  )
})

test('solves a sudoku', t => {
  const input = createInput()
  const solved = solveSudoku(input)
  t.true(solved)
})

const EMPTY = '.'
const ALL_CHARS_ARR = ['1', '2', '3', '4', '5', '6', '7', '8', '9']
const ALL_CHARS = new Set(ALL_CHARS_ARR)
const SEGMENT_SIZE = Math.sqrt(ALL_CHARS_ARR.length)

const solveSudoku = arr => solve(0, 0, arr)

const solve = (row, col, arr) => {
  const next = getNext(row, col, arr)

  if (arr[row][col] !== EMPTY) {
    return isUndefined(next) || solve(next.row, next.col, arr)
  }

  for (const char of getValidChars(row, col, arr)) {
    arr[row][col] = char
    const valid = isUndefined(next) || solve(next.row, next.col, arr)
    if (valid) {
      return true
    }
    arr[row][col] = EMPTY
  }

  return false
}

const getNext = (row, col, arr) => {
  if (col < arr[col].length - 1) {
    return {row, col: col + 1}
  }

  if (row < arr.length - 1) {
    return {row: row + 1, col: 0}
  }

  return undefined
}

const getValidChars = (row, col, arr) => {
  const taken = new Set([
    ...arr[row],
    ...arr.map(x => x[col]),
    ...charsInSegmentFor(row, col, arr)
  ])
  const valid = new Set(ALL_CHARS.values())
  for (const c of taken) {
    valid.delete(c)
  }
  return valid
}

const segmentFor = i =>
  Math.floor(i / SEGMENT_SIZE)

const offsetForSegment = i =>
  segmentFor(i) * SEGMENT_SIZE

const charsInSegmentFor = (row, col, arr) => {
  const rowOffset = offsetForSegment(row)
  const colOffset = offsetForSegment(col)

  const chars = []

  for (let i = 0; i < SEGMENT_SIZE; i++) {
    for (let j = 0; j < SEGMENT_SIZE; j++) {
      chars.push(arr[rowOffset + i][colOffset + j])
    }
  }

  return chars
}
