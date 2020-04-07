# [https://leetcode.com/problems/counting-elements]


def solve(xs):
    s = set(xs)
    count = 0
    for x in xs:
        if (x + 1 in s):
            count += 1
    return count


def test_empty():
    assert solve([]) == 0


def test_single():
    assert solve([1]) == 0


def test_two():
    assert solve([1, 1]) == 0
    assert solve([1, 2]) == 1
    assert solve([2, 3]) == 1


def test_three():
    assert solve([1, 1, 1]) == 0
    assert solve([1, 3, 5]) == 0
    assert solve([1, 2, 3]) == 2
