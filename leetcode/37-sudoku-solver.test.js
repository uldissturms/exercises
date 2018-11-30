// [https://leetcode.com/problems/sudoku-solver]

const test = require('ava')

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

test('segment for position', t => {
  t.deepEqual(segmentForPos(0), {row: 0, col: 0})
  t.deepEqual(segmentForPos(8), {row: 0, col: 0})
  t.deepEqual(segmentForPos(9), {row: 0, col: 1})
  t.deepEqual(segmentForPos(17), {row: 0, col: 1})
  t.deepEqual(segmentForPos(18), {row: 0, col: 2})
  t.deepEqual(segmentForPos(26), {row: 0, col: 2})
  t.deepEqual(segmentForPos(27), {row: 1, col: 0})
  t.deepEqual(segmentForPos(35), {row: 1, col: 0})
  t.deepEqual(segmentForPos(36), {row: 1, col: 1})
})

test('position in matrix', t => {
  t.deepEqual(posInMatix(0), {row: 0, col: 0})
  t.deepEqual(posInMatix(1), {row: 0, col: 1})
  t.deepEqual(posInMatix(2), {row: 0, col: 2})
  t.deepEqual(posInMatix(3), {row: 1, col: 0})
  t.deepEqual(posInMatix(8), {row: 2, col: 2})
})

test('position to absolute index', t => {
  t.deepEqual(posForIdx(0), {row: 0, col: 0})
  t.deepEqual(posForIdx(1), {row: 0, col: 1})
  t.deepEqual(posForIdx(2), {row: 0, col: 2})
  t.deepEqual(posForIdx(3), {row: 1, col: 0})
  t.deepEqual(posForIdx(9), {row: 0, col: 3})
  t.deepEqual(posForIdx(18), {row: 0, col: 6})
  t.deepEqual(posForIdx(26), {row: 2, col: 8})
  t.deepEqual(posForIdx(27), {row: 3, col: 0})
})

const EMPTY = '.'
const ALL_CHARS_ARR = ['1', '2', '3', '4', '5', '6', '7', '8', '9']
const ALL_CHARS_SIZE = ALL_CHARS_ARR.length
const ALL_CHARS = new Set(ALL_CHARS_ARR)
const SEGMENT_SIZE = Math.sqrt(ALL_CHARS_SIZE)
const BOARD_SIZE = ALL_CHARS_SIZE ** 2

const solveSudoku = arr => solve(0, arr)

const solve = (idx, arr) => {
  if (idx === BOARD_SIZE) {
    return true
  }

  const {row, col} = posForIdx(idx)

  if (arr[row][col] !== EMPTY) {
    return solve(idx + 1, arr)
  }

  for (const char of getValidChars(row, col, arr)) {
    arr[row][col] = char
    const valid = solve(idx + 1, arr)
    if (valid) {
      return true
    }
    arr[row][col] = EMPTY
  }

  return false
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

const add = (a, b) => ({
  row: a.row + b.row,
  col: a.col + b.col
})

const scale = ({row, col}, x) => ({
  row: row * x,
  col: col * x
})

const posForIdx = i =>
  add(
    scale(
      segmentForPos(i),
      SEGMENT_SIZE
    ),
    posInMatix(i % ALL_CHARS_SIZE)
  )

const segmentForPos = i =>
  posInMatix(Math.floor(i / ALL_CHARS_SIZE))

const posInMatix = i => ({
  row: segmentFor(i),
  col: i % SEGMENT_SIZE
})

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
