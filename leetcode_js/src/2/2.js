/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
function ListNode(val, next) {
  this.val = val === undefined ? 0 : val
  this.next = next === undefined ? null : next
}

/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function (l1, l2) {
  const res = new ListNode()
  let cur = res
  let carry = 0
  while (l1 || l2 || carry) {
    const x = l1 ? l1.val : 0
    const y = l2 ? l2.val : 0
    const num = x + y + carry
    cur = cur.next = new ListNode(num % 10)
    carry = Math.floor(num / 10)
    l1 = l1 ? l1.next : l1
    l2 = l2 ? l2.next : l2
  }
  return res.next
}

module.exports = {
  ListNode,
  addTwoNumbers,
}
