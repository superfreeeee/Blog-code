package leetcode.editor.cn;

public class P206ReverseLinkedList {
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
        public ListNode reverseList(ListNode head) {
            ListNode newHead = null;
            ListNode recent = null;
            while(head != null) {
                recent = head;
                head = head.next;
                recent.next = newHead;
                newHead = recent;
            }
            return newHead;
        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}
