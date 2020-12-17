package leetcode.editor.cn;

public class P19RemoveNthNodeFromEndOfList {
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
        public ListNode removeNthFromEnd(ListNode head, int n) {
            ListNode pre = head, cur = head;
            for(int i=0 ; i<n ; i++) {
                cur = cur.next;
            }
            if(cur == null) return head.next;
            while(cur.next != null) {
                pre = pre.next;
                cur = cur.next;
            }
            pre.next = pre.next.next;
            return head;
        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}