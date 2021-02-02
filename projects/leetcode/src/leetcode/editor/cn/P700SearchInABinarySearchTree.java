package leetcode.editor.cn;

public class P700SearchInABinarySearchTree {
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
        public TreeNode searchBST(TreeNode root, int val) {
            if(root == null) return null;
            if(root.val == val) return root;
            if(val < root.val) return searchBST(root.left, val);
            else return searchBST(root.right, val);
        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}