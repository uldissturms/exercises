# [4 Semesters of CS in 5 Hours](https://btholt.github.io/four-semesters-of-cs-part-two/)

### exercises (codepen)

* https://codepen.io/collection/XkgVjN/

### complete (codepen)

* https://codepen.io/collection/APoeqj/


### solved (codepen)

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
