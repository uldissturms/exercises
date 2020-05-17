def solve(xs, c):
    s = c
    r = 0

    for x in xs:
        if x == c:
            s = c - 1
        elif x == s:
            s -= 1
        else:
            s = c

        if s == 0:
            r += 1
            s = c

    return r


def test_solve():
    assert solve([1, 2, 3, 4, 4, 3, 2, 1, 9, 10], 4) == 1
    assert solve([1, 2, 3, 7, 9, 3, 2, 1, 8, 3, 2, 1], 3) == 2
    assert solve([101, 100, 99, 98], 2) == 0
    assert solve([100, 7, 6, 5, 4, 3, 2, 1, 100], 6) == 1
    assert solve([2, 1], 2) == 1


if __name__ == '__main__':
    t = int(input())
    for i in range(1, t + 1):
        [_, c] = list(map(int, input().split(" ")))
        arr = list(map(int, input().split(" ")))
        print("Case #{0}: {1}".format(i, solve(arr, c)))
