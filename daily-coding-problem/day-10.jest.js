test('solve', done => {
  expect.assertions(1)

  const start = new Date()
  let end

  const sleep = 1000

  solve(() => {
    end = new Date()
    expect(end - start).toBeGreaterThanOrEqual(sleep)
    done()
  }, sleep)
})

const solve = (fn, timeout) => {
  setTimeout(fn, timeout)
}
