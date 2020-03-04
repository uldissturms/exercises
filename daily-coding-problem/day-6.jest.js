/*
An XOR linked list is a more memory efficient doubly linked list. Instead of each node holding next and prev fields, it holds a field named both, which is an XOR of the next node and the previous node. Implement an XOR linked list; it has an add(element) which adds the element to the end, and a get(index) which returns the node at index.

If using a language that has no pointers (such as Python), you can assume you have access to get_pointer and dereference_pointer functions that converts between nodes and memory addresses.

*/

test('solve', () => {
  const { head, tail, add, get } = linkedList()

  expect(head()).toBeUndefined()
  expect(tail()).toBeUndefined()

  const firstNode = { val: 1 }
  add(firstNode)

  expect(head().data).toBe(firstNode)
  expect(tail().data).toBe(firstNode)
  expect(get(0).data).toBe(firstNode)
  expect(get(0).both).toBe(0)

  expect(get(1)).toBeUndefined()
  expect(get(2)).toBeUndefined()

  const secondNode = { val: 2 }
  add(secondNode)

  expect(head().data).toBe(firstNode)
  expect(tail().data).toBe(secondNode)

  expect(get(0).data).toBe(firstNode)
  expect(get(1).data).toBe(secondNode)
  expect(get(2)).toBeUndefined()
})

/*

manually:

XOR:

1. no overlap

a -> 101
b -> 010
c = a ^ b = 111

a = c ^ b = 101
b = c ^ a = 010

2. full overlap

a -> 110
b -> 110

c = a ^ b = 000

a = c ^ b = 110
b = c ^ a = 110

3. partial overlap

a -> 101
b -> 100

c = a ^ b = 001

a = c ^ b = 101
b = c ^ a = 100

prev    n    next
both = prev ^ next

i          0
0. both = prev ^ head.next
1. both = head ^ n.next
2. both = n ^ (n + 1).next

*/

const objToRef = new Map()
const refToObj = new Map()

const get_poiner = obj => objToRef.get(obj)
const dereference_pointer = ptr => refToObj.get(ptr)

const persistToMem = n => {
  objToRef.set(n, n.index)
  refToObj.set(n.index, n)
}

const linkedList = () => {
  let _head
  let _tail
  let count = 0

  const head = () => _head
  const tail = () => _tail

  const add = data => {
    const n = {
      index: count,
      both: _tail === undefined ? 0 : get_poiner(_tail),
      data,
    }

    if (_head === undefined) {
      _head = n
      _tail = n
    } else {
      persistToMem(n) // hack
      const ref = get_poiner(n)
      _tail.both = _tail.both ^ ref
      _tail = n
    }

    count++
  }

  const get = (idx) => {
    let n = _head
    let prev = 0

    for (let i = 0; i < idx; i++) {
      if (n === undefined) {
        return undefined
      }

      const ptr = n.both ^ prev

      if (ptr === 0) {
        return undefined
      }

      prev = dereference_pointer(n)
      n = dereference_pointer(ptr)
    }

    return n
  }

  return {
    head,
    tail,
    add,
    get,
  }
}
