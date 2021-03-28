const { test, expect } = require('@jest/globals')
const { ListNode, addTwoNumbers } = require('./2')

test('test 1', () => {
  const l1 = new ListNode(2)
  l1.next = new ListNode(4)
  l1.next.next = new ListNode(3)
  const l2 = new ListNode(5)
  l2.next = new ListNode(6)
  l2.next.next = new ListNode(4)
  const l3 = addTwoNumbers(l1, l2)
  expect(l3.val).toBe(7)
  expect(l3.next.val).toBe(0)
  expect(l3.next.next.val).toBe(8)
})