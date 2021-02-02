package leetcode.editor.cn;

public class P669TrimABinarySearchTree {
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
        public TreeNode trimBST(TreeNode root, int low, int high) {
            if(root == null) return null;
            if(root.val < low) return trimBST(root.right, low, high);
            if(root.val > high) return trimBST(root.left, low, high);
            root.left = trimBST(root.left, low, root.val);
            root.right = trimBST(root.right, root.val, high);
            return root;
        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}