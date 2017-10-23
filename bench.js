const {basename} = require('path')
const Benchmark = require('benchmark')
const Table = require('cli-table')
const glob = require('glob')

const getTable = name =>
  new Table({
    head: [name, 'mean', 'error'],
    colWidths: [40, 10, 10]
  })
const prettyNumber = value =>
  Benchmark.formatNumber(value.toFixed(value < 100 ? 2 : 0))
const prettyMoe = value =>
  `${value.toFixed(2)}%`
const pattern = '.bench.js'

glob(`**/*${pattern}`, (_, files) => {
  for (let file of files) {
    const tests = require(`./${file}`)
    const name = basename(file, pattern)
    const table = getTable(name)
    const suite = new Benchmark.Suite(name, {
      onComplete: () => { console.log(table.toString()) }
    })
    Object.keys(tests).forEach(key =>
      suite.add(key, tests[key], {
        onComplete: ({target: {name, stats}}) =>
          table.push([
            name,
            prettyNumber(stats.mean),
            prettyMoe(stats.rme)
          ])
      })
    )
    suite.run()
  }
})
