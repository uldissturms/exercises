# [https://leetcode.com/problems/middle-of-the-linked-list]


class ListNode:
    def __init__(self, x):
        self.val = x
        self.next = None


def solve(n):
    s = n
    f = n

    while (f and f.next):
        s = s.next
        f = f.next.next

    return s


def test_single():
    head = ListNode('h')
    assert solve(head) == head


def test_odd():
    n1 = ListNode(1)
    n2 = ListNode(2)
    n3 = ListNode(3)
    n4 = ListNode(4)
    n5 = ListNode(5)

    n1.next = n2
    n2.next = n3
    n3.next = n4
    n4.next = n5

    assert(solve(n1).val) == n3.val


def test_even():
    n1 = ListNode(1)
    n2 = ListNode(2)
    n3 = ListNode(3)
    n4 = ListNode(4)
    n5 = ListNode(5)
    n6 = ListNode(6)

    n1.next = n2
    n2.next = n3
    n3.next = n4
    n4.next = n5
    n5.next = n6

    assert(solve(n1).val) == n4.val
