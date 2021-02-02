package leetcode.editor.cn;

public class P876MiddleOfTheLinkedList {
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
        public ListNode middleNode(ListNode head) {
            if(head == null || head.next == null) return head;
            ListNode a = head, b = head.next;
            while(b != null) {
                a = a.next;
                b = b.next;
                if(b != null) b = b.next;
            }
            return a;
        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}