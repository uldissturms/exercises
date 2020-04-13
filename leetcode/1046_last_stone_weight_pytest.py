from heapq import heapify, heappop, heappush


def neg(x):
    return -x


def solve(xs):
    h = list(map(neg, xs))
    heapify(h)
    while len(h) > 1:
        fst = neg(heappop(h))
        snd = neg(heappop(h))
        dif = fst - snd
        if dif > 0:
            heappush(h, neg(dif))
    print(h)
    # print(len(h))
    return 0 if len(h) == 0 else neg(h[0])


def test_empty():
    assert(solve([])) == 0


def test_sinle():
    assert(solve([1])) == 1


def test_two_equal():
    assert(solve([1, 1])) == 0


def test_two_different():
    assert(solve([1, 3])) == 2


def test_multiple():
    assert(solve([1, 2, 3])) == 0
    assert(solve([1, 2, 3, 4])) == 0
    assert(solve([10, 20, 40, 80])) == 10
