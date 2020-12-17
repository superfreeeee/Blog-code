package leetcode.editor.cn;

public class P92ReverseLinkedListIi {
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
        public ListNode reverseBetween(ListNode head, int m, int n) {
            if (m >= n++) return head;
            ListNode H = new ListNode(0);
            H.next = head;
            head = H;
            ListNode L = head, R = head;
            while (--m > 0) L = L.next;
            while (--n > 0) R = R.next;
            ListNode right = R.next, left = head, mid = L.next;
            L.next = R.next = null;
            ListNode[] edges = reverse(mid);
            L.next = edges[0];
            edges[1].next = right;
            return left.next;
        }

        private ListNode[] reverse(ListNode n) {
            ListNode[] res = new ListNode[]{null, n};
            ListNode pre = n, cur = n.next;
            n.next = null;
            while(cur != null) {
                res[0] = cur;
                ListNode tmp = cur.next;
                cur.next = pre;
                pre = cur;
                cur = tmp;
            }
            return res;
        }

        private void print(ListNode n) {
            while(n != null) {
                System.out.print(n.val + "->");
                n = n.next;
            }
            System.out.println();
        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}