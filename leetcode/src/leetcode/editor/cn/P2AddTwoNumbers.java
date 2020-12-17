package leetcode.editor.cn;

public class P2AddTwoNumbers {
    public static void main(String[] args) {
    }

    public class ListNode {
        int val;
        ListNode next;

        ListNode(int x) {
            val = x;
        }
    }
    //leetcode submit region begin(Prohibit modification and deletion)

    /**
     * Definition for singly-linked list.
     * public class ListNode {
     * int val;
     * ListNode next;
     * ListNode(int x) { val = x; }
     * }
     */
    class Solution {
        public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
            int carry = 0;
            ListNode ZERO = new ListNode(0);

            ListNode res = new ListNode(-1);
            ListNode cur = res;
            while (l1 != null || l2 != null) {
                if (l1 == null) {
                    l1 = ZERO;
                } else if (l2 == null) {
                    l2 = ZERO;
                }
                int val = l1.val + l2.val + carry;
                carry = val / 10;
                cur = cur.next = new ListNode(val % 10);
                l1 = l1.next;
                l2 = l2.next;
            }
            if (carry > 0) {
                cur.next = new ListNode(carry);
            }
            return res.next;
        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}
