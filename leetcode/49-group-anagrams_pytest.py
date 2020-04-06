# [https://leetcode.com/problems/group-anagrams]


class Solution:
    def groupAnagrams(self, strs):
        return solve(strs)


def solve(xs):
    d = dict()
    for x in xs:
        s = ''.join(sorted(x))
        if (s in d):
            d[s].append(x)
        else:
            d[s] = [x]

    return [v for v in d.values()]


def test_solve_example():
    assert solve(['eat', 'tea', 'tan', 'ate', 'nat', 'bat']) == [
        ['eat', 'tea', 'ate'],
        ['tan', 'nat'],
        ['bat']
    ]

    def test_solve_single():
        assert solve(['eat']) == [['eat']]

    def test_solve_two():
        assert solve(['eat', 'ate']) == [['eat', 'ate']]

    def test_solve_three():
        assert solve(['eat', 'ate', 'zed']) == [['eat', 'ate'], ['zed']]

        def test_solve_empty():
            assert solve([]) == []
