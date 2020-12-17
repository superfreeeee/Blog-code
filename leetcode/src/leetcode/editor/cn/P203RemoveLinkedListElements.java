package leetcode.editor.cn;

public class P203RemoveLinkedListElements {
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
        public ListNode removeElements(ListNode head, int val) {
            while (head != null && head.val == val) head = head.next;
            if (head == null) return null;
            ListNode y = head;
            ListNode x = y.next;
            while (x != null) {
                if (x.val == val) y.next = x.next;
                else y = y.next;
                x = x.next;
            }
            return head;
        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}
