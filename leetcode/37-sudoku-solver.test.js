// [https://leetcode.com/problems/sudoku-solver]

const test = require('ava')

test.skip('solves a sudoku', t => {
  const input = [
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

  const solved = solveSudoku(input)
  t.true(solved)
})

const EMPTY = '.'
const SEGMENT_SIZE = 3
const ALL_CHARS = new Set(['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'])
const isEmpty = arr => arr.length === 0

const solveSudoku = arr => solve(0, 0, arr)

const outOfScope = (row, col, arr) =>
  row >= arr.length || col >= arr.length

const solve = (row, col, arr) => {
  if (row === 4) {
    console.log(arr)
    return true
  }

  console.log('row:', row, 'col:', col)
  if (outOfScope(row, col, arr)) {
    return true
  }

  const next = getNext(row, col, arr)

  if (arr[row][col] !== EMPTY) {
    return solve(next.row, next.col, arr)
  }

  const validMoves = getValidChars(row, col, arr)
  if (isEmpty(validMoves)) {
    return false
  }
  console.log('valid moves:', validMoves)
  for (const move of validMoves) {
    console.log('Setting:', row, col, 'to:', move)
    arr[row][col] = move
    const nextValid = solve(next.row, next.col, arr)
    if (nextValid) {
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
  const taken = [
    ...arr[row],
    ...arr.map(x => x[col]),
    ...charsInSegmentFor(row, col, arr)
  ]
  const valid = new Set(ALL_CHARS.values())
  for (const c of taken) {
    valid.delete(c)
  }
  return valid.values()
}

const segmentFor = i =>
  i % SEGMENT_SIZE

const charsInSegmentFor = (row, col, arr) => {
  const rowOffset = segmentFor(row) % SEGMENT_SIZE
  const colOffset = segmentFor(col) % SEGMENT_SIZE

  const chars = []

  for (let i = 0; i < SEGMENT_SIZE; i++) {
    for (let j = 0; j < SEGMENT_SIZE; j++) {
      chars.push(arr[rowOffset + i][colOffset + i])
    }
  }

  return chars
}
