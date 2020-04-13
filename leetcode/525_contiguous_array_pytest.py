import math


def solve(xs):
    def find_index(start, stop, step):
        c0 = 0
        c1 = 0
        d = math.inf
        dI = None
        for i in range(start, stop, step):
            x = xs[i]
            if x == 0:
                c0 += 1
            else:
                c1 += 1
            if c0 > 0 and c1 > 0 and abs(c0 - c1) <= d:
                d = abs(c0 - c1)
                dI = i
        return dI

    def find_m(start, stop, step):
        c0 = 0
        c1 = 0
        m = 0
        for i in range(start, stop, step):
            x = xs[i]
            if x == 0:
                c0 += 1
            else:
                c1 += 1
            if c0 == c1:
                m = c0
        return m

    # forward & backward check
    dF = find_index(0, len(xs), 1)
    dB = find_index(len(xs) - 1, -1, -1)

    if dF is None or dB is None:
        return 0

    mF = find_m(dF, -1, -1)
    mB = find_m(dB, len(xs), 1)

    return max([mF, mB]) * 2


def test_empty():
    assert(solve([])) == 0


def test_single_item():
    assert(solve([0])) == 0
    assert(solve([1])) == 0


def test_two_items():
    assert(solve([0, 1])) == 2
    assert(solve([1, 0])) == 2


def test_multiple_items():
    assert(solve([1, 1, 1])) == 0
    assert(solve([0, 0, 0])) == 0
    assert(solve([0, 1, 0])) == 2
    assert(solve([1, 0, 0, 1])) == 4
    assert(solve([0, 1, 0, 1])) == 4
    assert(solve([1, 0, 1, 0])) == 4
    assert(solve([0, 1, 1, 0])) == 4


def test_examples():
    assert(solve([0, 1, 1, 0, 0, 0, 0, 0, 1])) == 4  # starts from beginning
    assert(solve([0, 0, 0, 1, 0, 1, 0, 0, 0])) == 4  # starts from middle
    assert(solve([1, 0, 0, 0, 0, 0, 1, 1, 0])) == 4  # starts from end
    assert(solve([1, 0, 0, 0, 1, 1])) == 6  # covers all array


def test_leetcode():
    # assert(solve([0, 1, 0, 1, 1, 1, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1,
    #               1, 0, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1])) == 68

    pass
