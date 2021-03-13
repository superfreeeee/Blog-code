package leetcode.editor.cn;

public class P445AddTwoNumbersIi {
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
            l1 = reverse(l1);
            l2 = reverse(l2);
            ListNode res = new ListNode(0), cur = res;
            int carry = 0;
            while(l1 != null || l2 != null) {
                if(l1 != null) {
                    carry += l1.val;
                    l1 = l1.next;
                }
                if(l2 != null) {
                    carry += l2.val;
                    l2 = l2.next;
                }
                cur = cur.next = new ListNode(carry % 10);
                carry /= 10;
            }
            if(carry > 0) cur.next = new ListNode(carry);
            return reverse(res.next);
        }

        private ListNode reverse(ListNode l) {
            if(l == null || l.next == null) return l;
            ListNode pre = l, cur = l.next, tmp;
            l.next = null;
            while(cur != null) {
                tmp = cur.next;
                cur.next = pre;
                pre = cur;
                cur = tmp;
            }
            return pre;
        }

        private void print(ListNode l) {
            while(l != null) {
                System.out.print(l.val + "->");
                l = l.next;
            }
            System.out.println();
        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}