# [https://leetcode.com/problems/longest-continuous-increasing-subsequence]


def solve(xs):
    max = 0
    cur = 0

    for i in range(len(xs)):
        cur += 1
        if i == len(xs) - 1 or xs[i] >= xs[i + 1]:
            if cur > max:
                max = cur
            cur = 0

    return max


def test_empty():
    assert solve([]) == 0


def test_single():
    assert solve([1]) == 1


def test_increasing():
    assert solve([1, 2, 3, 2, 5]) == 3


def test_same_value():
    assert solve([2, 2, 2, 2, 2]) == 1
