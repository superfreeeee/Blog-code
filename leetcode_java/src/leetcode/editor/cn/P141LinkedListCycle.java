package leetcode.editor.cn;

public class P141LinkedListCycle {
    public static void main(String[] args) {
    }

    class ListNode {
        int val;
        ListNode next;

        ListNode(int x) {
            val = x;
            next = null;
        }
    }
    //leetcode submit region begin(Prohibit modification and deletion)

    /**
     * Definition for singly-linked list.
     * class ListNode {
     * int val;
     * ListNode next;
     * ListNode(int x) {
     * val = x;
     * next = null;
     * }
     * }
     */
    public class Solution {
        public boolean hasCycle(ListNode head) {
            if(head == null) return false;
            ListNode p1 = head, p2 = head.next;
            while(p2 != null && p2.next != null) {
                p1 = p1.next;
                p2 = p2.next.next;
                if(p1 == p2) return true;
            }
            return false;
        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}