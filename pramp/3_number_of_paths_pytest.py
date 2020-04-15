def key(x, y):
    return '_'.join(map(str, [x, y]))


def solve_r(n):
    memo = {}

    def dfs(x, y):
        k = key(x, y)

        if k in memo:
            return memo[k]

        if (x >= n or y >= n):
            return 0

        if (y > x):
            return 0

        if x == n - 1 and y == n - 1:
            return 1

        r = dfs(x + 1, y) + dfs(x, y + 1)

        memo[k] = r

        return r

    return dfs(0, 0)


def solve_i(n):

    memo = {}
    memo[key(n - 1, n - 1)] = 1

    for i in range(n - 1, -1, -1):
        for j in range(n - 1, -1, -1):
            k = key(i, j)
            if k not in memo:
                memo[k] = 0 if j > i else memo.get(key(i + 1, j), 0) \
                    + memo.get(key(i, j + 1), 0)

    return memo[key(0, 0)]


def solve_i_sr_td(n):

    top = [0] * n
    top[n - 1] = 1

    for i in range(n - 2, -1, -1):
        cur = [0] * n
        for j in range(n - 1, i - 1, -1):
            cur[j] = top[j] if j == n - 1 else top[j] + cur[j + 1]
        top = cur

    return top[0]


def solve_i_sr_bu(n):

    bt = [1] * n

    for i in range(1, n):
        cur = [0] * n
        for j in range(i, n):
            cur[j] = bt[j] if j == i else bt[j] + cur[j - 1]
        bt = cur[:]

    return bt[n - 1]


solve = solve_i_sr_bu


def test_small():
    assert(solve(1)) == 1
    assert(solve(2)) == 1
    assert(solve(3)) == 2
    assert(solve(4)) == 5
    assert(solve(5)) == 14
    assert(solve(6)) == 42


def test_medium():
    assert(solve(10)) == 4862
    assert(solve(13)) == 208012
    assert(solve(14)) == 742900


def test_large():
    assert(solve(17)) == 35357670


def test_max():
    assert(solve(100)) == 227508830794229349661819540395688853956041682601541047340

# notice that answer follows [catalan numbers](https://en.wikipedia.org/wiki/Catalan_number)
