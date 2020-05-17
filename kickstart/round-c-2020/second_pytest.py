
def solve(m):
    r = len(m)
    c = len(m[0])
    ds = {}

    for i in range(r - 1):
        for j in range(c):
            x = m[i][j]
            y = m[i + 1][j]
            s = ds.get(x, set())
            if y != x:
                s.add(y)
            ds[x] = s

    ks = ds.keys()
    r = []
    s = set()

    while (len(r) < len(ks)):
        added = False
        for k in ks:
            if k not in s and not any(map(lambda x: x not in s, ds.get(k))):
                r.append(k)
                s.add(k)
                added = True
        if not added:
            return ['-1']

    return r


def test_solve():
    assert solve([
        list('ZOAAMM'),
        list('ZOAOMM'),
        list('ZOOOOM'),
        list('ZZZZOM'),
    ]) == list('ZOAM')

    assert solve([
        list('XXOO'),
        list('XFFO'),
        list('XFXO'),
        list('XXXO'),
    ]) == ['-1']

    assert solve([
        list('XXX'),
        list('XPX'),
        list('XXX'),
        list('XJX'),
        list('XXX'),
    ]) == ['-1']

    assert solve([
        list('AAABBCCDDE'),
        list('AABBCCDDEE'),
        list('AABBCCDDEE'),
    ]) == list('EDCBA')

    assert solve([
        list('AAAABCCCCC'),
        list('AAAABCCCCC'),
        list('AAABBBCCCC'),
    ]) == list('BCA')


if __name__ == '__main__':
    t = int(input())
    for i in range(1, t + 1):
        [r, c] = list(map(int, input().split(" ")))
        m = []
        for ri in range(r):
            arr = list(input())
            m.append(arr)
        res = solve(m)
        print("Case #{0}: {1}".format(i, ''.join(res)))
