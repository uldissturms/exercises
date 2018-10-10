# [4 Semesters of CS in 5 Hours](https://btholt.github.io/four-semesters-of-cs-part-two/)

### exercises (codepen)

* https://codepen.io/collection/XkgVjN/

### complete (codepen)

* https://codepen.io/collection/APoeqj/

### other

* [pathfinding visualizations](https://qiao.github.io/PathFinding.js/visual/)

### solved (codepen)

* [bloom filter](https://codepen.io/uldissturms/pen/YJWwXG/?editors=0010#0)

```js
const h1 = string => Math.abs(XXH.h32(0xABCD).update(string).digest().toNumber() % 100);
const h2 = string => Math.abs(XXH.h32(0x1234).update(string).digest().toNumber() % 100);
const h3 = string => Math.abs(XXH.h32(0x6789).update(string).digest().toNumber() % 100);

class BloomFilter {
  mask = {}
  add (string) {
    this.mask[h1(string)] = true
    this.mask[h2(string)] = true
    this.mask[h3(string)] = true
  }
  contains (string) {
    return (this.mask[h1(string)] &&
            this.mask[h2(string)] &&
            this.mask[h3(string)]
      ) === true
  }
};
```

* [maze generation](https://codepen.io/uldissturms/pen/zmvaqW?editors=0010)

```js
const valid = (y, x, maze) => (dir) => {
  if (dir === 'w' && x === 0) {
    return false
  }

  if (dir === 's' && y === 0) {
    return false
  }

  if (dir === 'e' && x === maze[y].length - 1) {
    return false
  }

  if (dir === 'n' && y === maze.length - 1) {
    return false
  }

  return true
}

const notVisited = (y, x, maze, dir) =>
  maze[y][x].visited === false

const validDirections = (dirs, y, x, maze) => dirs
  .filter(valid(y, x, maze))

const visit = (y, x, maze) => {
  maze[y][x].visited = true
}

const oppositeDir = {
  'e': 'w',
  'w': 'e',
  's': 'n',
  'n': 's'
}

const breakWalls = (y, x, dir, maze) => {
  maze[y][x][dir] = false
  const [oy, ox] = next(y, x, dir)
  const odir = oppositeDir[dir]
  maze[oy][ox][odir] = false
}

const nextPos = {
  'w': (y, x) => [y, x - 1],
  'e': (y, x) => [y, x + 1],
  'n': (y, x) => [y + 1, x],
  's': (y, x) => [y - 1, x]
}

const next = (y, x, dir) => nextPos[dir](y, x)

const generateMaze = (maze, [xStart, yStart]) => {
  visit(yStart, xStart, maze)
  const dirs = validDirections(
      randomizeDirection(),
      yStart,
      xStart,
      maze
  )
  for (const dir of dirs) {
    const [ny, nx] = next(yStart, xStart, dir)
    if (notVisited(ny, nx, maze, dir)) {
      breakWalls(yStart, xStart, dir, maze)
      generateMaze(maze, [nx, ny])
    }
  }

  return maze;
};
```

* [radix sort](https://codepen.io/uldissturms/pen/EdyKVZ?editors=0010)

```js
const addItem = (q, index, item) => {
  if (q[index] === undefined) {
    q[index] = [item]
  } else {
    q[index].push(item)
  }
  return q
}

const flatten = (x) =>
  x.reduce((acc, cur) => acc.concat(cur))

const nthNumber = (index, item) => {
  const chars = (item).toString()
  const char = chars[chars.length - index - 1] || '0'
  return parseInt(char, 10)
}

function radixSort(array) {
  snapshot(array);

  let index = 0
  while (true) {
    const q = []
    for (const item of array) {
      addItem(q, nthNumber(index, item), item)
    }

    if (q.length === 1) {
      return array
    }

    array = flatten(q)
    snapshot(array)
    index++
  }
}
```

* [heap sort](https://codepen.io/uldissturms/pen/EdNerB?editors=0010)

```js
const leftChild = i =>
  i * 2 + 1
const rightChild = i =>
  i * 2 + 2
const maxChild = (a, i, s) => {
  const li = leftChild(i)
  const ri = rightChild(i)

  if (li >= s) {
    return []
  }

  if (ri >= s) {
    return [li, a[li]]
  }

  return a[li] > a[ri] ? [li, a[li]] : [ri, a[ri]]
}
const swap = (a, l, r) => {
  const t = a[l]
  a[l] = a[r]
  a[r] = t
}

const isNotUndefined = x =>
  typeof x !== 'undefined'

// O(log n)
const heapify = (a, i = 0, s = a.length) => {
  const [ci, cv] = maxChild(a, i, s)
  if (isNotUndefined(ci) && cv > a[i]) {
    swap(a, i, ci)
    heapify(a, ci, s)
  }
  return a
}

// O(n)
const buildHeap = a => {
  for (let i = Math.floor(a.length / 2); i >= 0; i--) {
    heapify(a, i, a.length)
  }
  return a
}

// O(n log n)
const heapSort = a => {
  let heapSize = a.length

  a = buildHeap(a)
  snapshot(a)

  for (let i = heapSize - 1; i >= 0; i--) {
    heapSize--
    swap(a, 0, i)
    heapify(a, 0, heapSize)
    snapshot(a)
  }

  return a
}
```
