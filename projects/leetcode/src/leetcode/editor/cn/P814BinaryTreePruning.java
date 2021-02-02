package leetcode.editor.cn;

public class P814BinaryTreePruning {
    public static void main(String[] args) {
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

        private int count = 1;

        public TreeNode pruneTree(TreeNode root) {
            while (count > 0) {
                count = 0;
                root = cut(root);
            }
            return root;
        }

        private TreeNode cut(TreeNode root) {
            if (root == null) return null;
            if (zeroLeaf(root)) {
                count++;
                return null;
            }
            root.left = cut(root.left);
            root.right = cut(root.right);
            return root;
        }

        private boolean zeroLeaf(TreeNode t) {
            return t != null && t.val == 0 && t.left == null && t.right == null;
        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}