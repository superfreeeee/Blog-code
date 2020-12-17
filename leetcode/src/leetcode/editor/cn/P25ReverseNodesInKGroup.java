package leetcode.editor.cn;

public class P25ReverseNodesInKGroup {
    public static void main(String[] args) {
    }

    public class ListNode {
        int val;
        ListNode next;

        ListNode() {
        }

        ListNode(int val) {
            this.val = val;
        }

        ListNode(int val, ListNode next) {
            this.val = val;
            this.next = next;
        }
    }
    //leetcode submit region begin(Prohibit modification and deletion)

    /**
     * Definition for singly-linked list.
     * public class ListNode {
     * int val;
     * ListNode next;
     * ListNode() {}
     * ListNode(int val) { this.val = val; }
     * ListNode(int val, ListNode next) { this.val = val; this.next = next; }
     * }
     */
    class Solution {
        public ListNode reverseKGroup(ListNode head, int k) {
            if(head == null) return null;
            ListNode cur = head;
            for (int i = 1; i < k; i++) {
                cur = cur.next;
                if (cur == null) return head;
            }
            ListNode rest = cur.next;
            cur.next = null;
            ListNode tail = head;
            head = reverse(head);
            tail.next = reverseKGroup(rest, k);
            return head;
        }

        private ListNode reverse(ListNode n) {
            if (n == null) return n;
            ListNode head = n;
            n = n.next;
            head.next = null;
            while (n != null) {
                ListNode tmp = n;
                n = n.next;
                tmp.next = head;
                head = tmp;
            }
            return head;
        }

        private void print(ListNode n) {
            while (n != null) {
                System.out.print(n.val + "->");
                n = n.next;
            }
            System.out.println();
        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}