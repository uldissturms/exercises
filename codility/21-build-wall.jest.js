/*

manually:

[8, 8, 5, 7, 9, 8, 7, 4, 8]

current height: 8
stack of heights
4, 4

1, 1, 2, 3, 4, 5, 5, 6, 7

*/

/*
steps:
1. init stack of heights
2. init current height to 0
3. init count of blocks to 0
4. for each height
    if desired height > current height
      add block
      update current height
      increment block count
    if desired height < current height
      remove blocks from stack until height <= desired
      add block
      update current height
      increment block count
5. return block count
*/

test('sole', () => {
  expect(solve([])).toEqual(0)
  expect(solve([1])).toEqual(1)
  expect(solve([1, 1])).toEqual(1)
  expect(solve([1, 2])).toEqual(2)
  expect(solve([2, 1])).toEqual(2)
  expect(solve([2, 1, 2])).toEqual(3)
  expect(solve([1, 2, 1])).toEqual(2)
  expect(solve([8, 8, 5, 7, 9, 8, 7, 4, 8])).toEqual(7)
})

const solve = xs => {
  const blocks = []
  let blockCount = 0
  let currentHeight = 0

  const addBlock = size => {
    blocks.push(size)
    blockCount++
  }

  for (const x of xs) {
    let diff = x - currentHeight

    while (diff < 0) {
      const block = blocks.pop()
      diff += block
    }

    if (diff > 0) {
      addBlock(diff)
    }

    currentHeight = x
  }

  return blockCount
}
