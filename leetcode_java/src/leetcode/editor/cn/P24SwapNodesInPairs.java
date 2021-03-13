package leetcode.editor.cn;

public class P24SwapNodesInPairs {
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
        public ListNode swapPairs(ListNode head) {
            if(head == null || head.next == null) return head;
            ListNode cur = head;
            head = cur.next;
            cur.next = head.next;
            head.next = cur;
            cur.next = swapPairs(cur.next);
            return head;
        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}