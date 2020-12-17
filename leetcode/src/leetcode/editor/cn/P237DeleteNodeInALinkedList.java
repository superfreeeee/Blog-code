package leetcode.editor.cn;

public class P237DeleteNodeInALinkedList {
    public static void main(String[] args) {
    }

    public class ListNode {
        int val;
        ListNode next;

        ListNode(int x) {
            val = x;
        }
    }

    private ListNode head;
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
        public void deleteNode(ListNode node) {
            node.val = node.next.val;
            if (node.next.next == null) node.next = null;
            else deleteNode(node.next);
        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}