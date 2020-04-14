def solve_set(arr):
    s = set(arr)

    for i in range(len(arr)):
        if i not in s:
            return i
    return len(arr)


def solve_arr(arr):
    def update(v):
        # out of range
        if v < 0 or v >= len(arr):
            return

        # already what's expected
        if arr[v] == v:
            return

        tmp = arr[v]

        arr[v] = v

        update(tmp)

    # build dict
    for i in range(len(arr)):
        if not i == arr[i]:
            update(arr[i])

    # find missing
    for i in range(len(arr)):
        if not i == arr[i]:
            return i

    return len(arr)


# solve = solve_set
solve = solve_arr


def test_middle():
    assert(solve([0, 1, 3, 4])) == 2


def test_beginning():
    assert(solve([1, 2, 3])) == 0


def test_end():
    assert(solve([0, 1, 2, 3])) == 4


def test_messed():
    assert(solve([2, 0, 3, 1])) == 4


def test_empty():
    assert(solve([])) == 0


def test_single():
    assert(solve([0])) == 0
    assert(solve([1])) == 0
