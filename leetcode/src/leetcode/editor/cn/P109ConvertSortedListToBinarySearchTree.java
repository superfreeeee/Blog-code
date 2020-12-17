package leetcode.editor.cn;

public class P109ConvertSortedListToBinarySearchTree {
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

    public class TreeNode {
        int val;
        TreeNode left;
        TreeNode right;

        TreeNode() {
        }

        TreeNode(int val) {
            this.val = val;
        }

        TreeNode(int val, TreeNode left, TreeNode right) {
            this.val = val;
            this.left = left;
            this.right = right;
        }
    }
    //leetcode submit region begin(Prohibit modification and deletion)
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode() {}
 *     ListNode(int val) { this.val = val; }
 *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }
 * }
 */
    /**
     * Definition for a binary tree node.
     * public class TreeNode {
     * int val;
     * TreeNode left;
     * TreeNode right;
     * TreeNode() {}
     * TreeNode(int val) { this.val = val; }
     * TreeNode(int val, TreeNode left, TreeNode right) {
     * this.val = val;
     * this.left = left;
     * this.right = right;
     * }
     * }
     */
    class Solution {
        public TreeNode sortedListToBST(ListNode head) {
            if(head == null) return null;
            if(head.next == null) return new TreeNode(head.val);
            int len = 0;
            ListNode cur = head;
            while(cur != null) {
                cur = cur.next;
                len++;
            }
//            System.out.println(len);
            return build(head, len);
        }

        private TreeNode build(ListNode head, int size) {
//            System.out.println(head.val + " " + size);
            if(size == 0) return null;
            if(size == 1) return new TreeNode(head.val);
            ListNode mid = find(head, size / 2);
            TreeNode root = new TreeNode(mid.val);
            root.left = build(head, size / 2);
            root.right = build(mid.next, size - size / 2 - 1);
            return root;
        }

        private ListNode find(ListNode head, int pos) {
            while(pos-- > 0) head = head.next;
            return head;
        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}