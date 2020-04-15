# [https://leetcode.com/problems/delete-operation-for-two-strings]

import math


def solve_lc(xs, ys):
    lenX = len(xs)
    lenY = len(ys)

    memo = {}

    def dp(xI, yI):
        if xI == lenX or yI == lenY:
            return 0

        k = '_'.join([str(xI), str(yI)])

        if k in memo:
            return memo[k]

        x = xs[xI]
        y = ys[yI]

        '''
        * if same then inc both and increase the common part
        * inc xI
        * inc yI
        '''

        opts = [
            dp(xI + 1, yI),
            dp(xI, yI + 1),
        ]

        if x == y:
            opts.append(
                dp(xI + 1, yI + 1) + 1
            )

        m = max(opts)

        memo[k] = m

        return m

    common = dp(0, 0)

    return lenX + lenY - (common * 2)


def solve_d(xs, ys):
    lenX = len(xs)
    lenY = len(ys)

    memo = {}

    def key(x, y):
        return '_'.join(map(str, [x, y]))

    def dp(xI, yI):
        if xI == lenX:
            return lenY - yI

        if yI == lenY:
            return lenX - xI

        k = key(xI, yI)

        if k in memo:
            return memo[k]

        x = xs[xI]
        y = ys[yI]

        '''
        * if same then inc both and keep edits
        * inc xI
        * inc yI
        '''

        opts = [
            dp(xI + 1, yI) + 1,
            dp(xI, yI + 1) + 1,
        ]

        if x == y:
            opts.append(
                dp(xI + 1, yI + 1)
            )

        m = min(opts)

        memo[k] = m

        return m

    return dp(0, 0)


def solve_i(xs, ys):

    lenX = len(xs)
    lenY = len(ys)

    if lenX == 0:
        return lenY

    if lenY == 0:
        return lenX

    def init(x, y):
        return [[z] * y for z in [math.inf] * x]

    dp = init(lenX + 1, lenY + 1)

    # last column
    for i in range(0, lenX + 1):
        dp[i][lenY] = lenX - i

    # last row
    for i in range(0, lenY + 1):
        dp[lenX][i] = lenY - i

    for i in range(lenX - 1, -1, -1):
        for j in range(lenY - 1, -1, -1):
            opts = [
                dp[i + 1][j] + 1,
                dp[i][j + 1] + 1,
            ]
            if (xs[i] == ys[j]):
                opts.append(dp[i + 1][j + 1])
            dp[i][j] = min(opts)

    return dp[0][0]


solve = solve_i


def test_equal():
    assert(solve('', '')) == 0
    assert(solve('a', 'a')) == 0
    assert(solve('ab', 'ab')) == 0


def test_extra_at_ends():
    assert(solve('ab', 'abc')) == 1
    assert(solve('abc', 'ab')) == 1


def test_extra_in_middle():
    assert(solve('abc', 'ac')) == 1
    assert(solve('ac', 'abc')) == 1


def test_multiple_extra():
    assert(solve('abc', 'aebec')) == 2
    assert(solve('abc', 'eabce')) == 2


def test_examples():
    assert(solve('dog', 'frog')) == 3
    assert(solve('some', 'some')) == 0
    assert(solve('some', 'thing')) == 9
