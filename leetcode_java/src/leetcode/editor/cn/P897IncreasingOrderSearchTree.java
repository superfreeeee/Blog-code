package leetcode.editor.cn;

public class P897IncreasingOrderSearchTree {
    public static void main(String[] args) {
    }

    public class TreeNode {
        int val;
        TreeNode left;
        TreeNode right;

        TreeNode(int x) {
            val = x;
        }
    }
    //leetcode submit region begin(Prohibit modification and deletion)

    /**
     * Definition for a binary tree node.
     * public class TreeNode {
     * int val;
     * TreeNode left;
     * TreeNode right;
     * TreeNode(int x) { val = x; }
     * }
     */
    class Solution {

        private TreeNode head = new TreeNode(0);
        private TreeNode cur = head;

        public TreeNode increasingBST(TreeNode root) {
            inorder(root);
            return head.right;
        }

        private void inorder(TreeNode t) {
            if(t != null) {
                inorder(t.left);
                cur = cur.right = t;
                cur.left = null;
                inorder(t.right);
            }
        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}