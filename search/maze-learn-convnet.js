const fs = require('fs')
const path = require('path')
const {deepqlearn} = require('convnet')
const {not} = require('../helpers')
const rows = 8
const cols = 7
const numInputs = rows * cols
const numActions = 5 // possible moves
const temporalWindow = 1
const networkSize = numInputs * temporalWindow + numActions * temporalWindow + numInputs

const layers = []
layers.push({type: 'input', out_sx: 1, out_sy: 1, out_depth: networkSize})
layers.push({type: 'fc', num_neurons: 10, activation: 'relu'})
layers.push({type: 'fc', num_neurons: 10, activation: 'relu'})
layers.push({type: 'regression', num_neurons: numActions})

const trainerOptions = {learning_rate: 0.001, momentum: 0.0, batch_size: 64, l2_decay: 0.01}

var opt = {}
opt.temporal_window = temporalWindow
opt.experience_size = 10000
opt.start_learn_threshold = 10
opt.gamma = 0.7
opt.learning_steps_total = 200000
opt.learning_steps_burnin = 1000
opt.epsilon_min = 0.01
opt.epsilon_test_time = 0.01
opt.layer_defs = layers
opt.tdtrainer_options = trainerOptions

const invalid = -1000000
const _ = -1 // cell
const X = invalid // no cell
const S = -10 // start
const E = 1000000 // end

const data = [
  _, _, _, _, _, _, _, // 0
  _, X, _, X, _, _, _, // 1
  _, X, _, X, _, _, _, // 2
  _, X, _, X, _, _, _, // 3
  _, _, E, X, X, _, _, // 4
  _, X, X, _, _, _, _, // 5
  _, X, _, _, _, X, _, // 6
  X, _, _, _, S, _, _ // 7
]

const brain = new deepqlearn.Brain(numInputs, numActions, opt) // woohoo

const learn = (brain, data, start, times) => {
  let index = start
  while (times > 0) {
    const action = next(brain, data, index)
    const reward = data[index]
    brain.backward(reward)
    console.log('reward:', reward, 'location', indexToLocation(index), 'action:', action, 'times:', times)
    index = actionToLocationFn[action](index)
    times--
  }
}

const STAY = 0
const UP = 1
const DOWN = 2
const LEFT = 3
const RIGHT = 4

const isValidAction = (action, index) => {
  if (action === STAY) {
    return true
  }

  const {row, col} = indexToLocation(index)
  if (action === UP && row > 0) {
    return true
  }

  if (action === DOWN && row < rows - 1) {
    return true
  }

  if (action === LEFT && col > 0) {
    return true
  }

  if (action === RIGHT && col < cols - 1) {
    return true
  }

  return false
}

const isNotValidAction = not(isValidAction)

const next = (brain, data, index) => {
  let action = brain.forward(data)
  while (isNotValidAction(action, index)) {
    brain.backward(invalid)
    action = brain.forward(data)
  }
  return action
}

const locationToIndex = (row, col) =>
  row * cols + col

const indexToLocation = i => {
  const row = Math.floor(i / cols)
  const col = i % cols
  return {row, col}
}

const actionToLocationFn = [
  x => x,
  x => x - cols, // up
  x => x + cols, // down
  x => x - 1, // left
  x => x + 1 // right
]

const stats = brain => ({
  averageReward: brain.average_reward_window.get_average()
})

const settings = ({learning}) => ({
  learning
})

const persist = brain =>
  fs.writeFileSync(path.join(__dirname, 'brain.json'), JSON.stringify(brain.value_net.toJSON()), 'utf8')

const start = locationToIndex(7, 4)
// train
console.log('settings:', settings(brain))
learn(brain, data, start, 5000)
persist(brain)
console.log('stats:', stats(brain))

// test
learn(brain, data, start, 50)
