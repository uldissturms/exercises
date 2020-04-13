# [https://leetcode.com/problems/delete-operation-for-two-strings]


def solve(xs, ys):
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
    * if same then increment both and increase the common part
    * take xI or take yI
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


def test_examples():
    assert(solve('dog', 'frog')) == 3
    assert(solve('some', 'some')) == 0
    assert(solve('some', 'thing')) == 9
    assert(solve('', '')) == 0
