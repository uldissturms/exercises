function TreeNode (val) {
  this.val = val
  this.left = NULL_VAL
  this.right = NULL_VAL
}

const NULL_VAL = null

const node = (val, left = NULL_VAL, right = NULL_VAL) => {
  const n = new TreeNode(val)
  n.left = left
  n.right = right
  return n
}

const treeWithNulls = node(1,
  node(2),
  node(3,
    node(4),
    node(5)
  )
)

test('serialize tree as an array', () => {
  expect(ser(treeWithNulls)).toEqual('[1,2,null,null,3,4,null,null,5,null,null]')
  expect(ser(node(2))).toEqual('[2,null,null]')
  expect(ser(node(3, node(4), node(5)))).toEqual('[3,4,null,null,5,null,null]')
  expect(ser(null)).toEqual('[null]')
})

test('deserialize array as a tree', () => {
  expect(de('[1,2,null,null,3,4,null,null,5,null,null]')).toEqual(treeWithNulls)
  expect(de('[1,2,null,null,3,null,null]')).toEqual(node(1, node(2), node(3)))
  expect(de('[null]')).toEqual(null)
})

const ser = (n) => {
  const dfs = (n) => {
    if (n == null) {
      return ['null']
    }

    return [n.val, ...dfs(n.left), ...dfs(n.right)]
  }

  return `[${dfs(n).join(',')}]`
}

/*
dfs(1)
[1, ...dfs(2), ...dfs(3)]
[1, 2, null, null, ...dfs(3)]
[1, 2, null, null, 3, 4 ,null, null, 5, null, null]
*/

const de = (s) => {
  const xs = s.substring(1, s.length - 1).split(',')

  const dfs = (i) => {
    const x = xs[i]

    if (x === 'null') {
      return [null, i]
    }

    const [ln, li] = dfs(i + 1)
    const [rn, ri] = dfs(li + 1)

    return [node(parseInt(x, 10), ln, rn), ri]
  }

  const [root] = dfs(0)
  return root
}

/*
[1,2,null,null,3,4,null,null,5,null,null]
dfs(0)
node(1, node(2, null, null), node(3, node(4, null, null), node(5, null, null)))
*/

const complexTree = node(5,
  node(2),
  node(3, node(2, node(3), node(1)), node(4))
)

const unbalancedLeftTree = node(1,
  node(2,
    node(3,
      node(4,
        node(5)
      )
    )
  )
)

const unbalancedRightTree = node(1,
  NULL_VAL,
  node(2,
    NULL_VAL,
    node(3,
      NULL_VAL,
      node(4,
        NULL_VAL,
        node(5)
      )
    )
  )
)

test('serialize and deserialize', () => {
  expect(de(ser(treeWithNulls))).toEqual(treeWithNulls)
  expect(de(ser(complexTree))).toEqual(complexTree)
  expect(de(ser(unbalancedLeftTree))).toEqual(unbalancedLeftTree)
  expect(de(ser(unbalancedRightTree))).toEqual(unbalancedRightTree)
})
