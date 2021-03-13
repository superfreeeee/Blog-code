package leetcode.editor.cn;

public class P112PathSum {
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
        public boolean hasPathSum(TreeNode root, int sum) {
            if (root == null) return false;
            int nextSum = sum - root.val;
            if (root.left == null && root.right == null) return nextSum == 0;
            if (root.left == null) return hasPathSum(root.right, nextSum);
            if (root.right == null) return hasPathSum(root.left, nextSum);
            return hasPathSum(root.left, nextSum) || hasPathSum(root.right, nextSum);
        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}
