test('solve', () => {
  expect(solve(['x', 'y', 'z'], 'xyyzyzyx')).toEqual('zyx')
  expect(solve(['x', 'y', 'z'], 'xyyz')).toEqual('xyyz')
  expect(solve(['x', 'y', 'z'], 'yyz')).toEqual('')
  expect(solve(['a'], '')).toEqual('')
  expect(solve(['a'], 'b')).toEqual('')
  expect(solve(['a', 'b', 'c'], 'adobecodebancddd')).toEqual('banc')
  expect(solve(['A', 'B', 'C', 'E', 'K', 'I'], 'KADOBECODEBANCDDDEI')).toEqual(
    'KADOBECODEBANCDDDEI'
  )
})

const solve = (cs, xs) => {
  let bI = 0

  const l = cs.length
  const s = new Set(cs)
  const m = new Map()

  let rL = Infinity
  let rS = 0
  let rE = 0

  for (let i = 0; i < xs.length; i++) {
    const x = xs[i]

    if (s.has(x)) {
      m.set(x, i)
    }

    while (m.size === l) {
      const cL = i - bI + 1

      if (cL < rL) {
        rL = cL
        rS = bI
        rE = i + 1
      }

      const b = xs[bI]

      if (s.has(b) && m.get(b) === bI) {
        m.delete(b)
      }

      bI++
    }
  }

  return xs.substring(rS, rE)
}
