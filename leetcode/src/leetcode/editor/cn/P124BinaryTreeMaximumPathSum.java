package leetcode.editor.cn;

public class P124BinaryTreeMaximumPathSum {
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
        public int maxPathSum(TreeNode root) {
            if (root.left == null && root.right == null) return root.val;
            int cross = maxPath(root.left) + maxPath(root.right) + root.val;
            int left = root.left == null ? Integer.MIN_VALUE : maxPathSum(root.left);
            int right = root.right == null ? Integer.MIN_VALUE : maxPathSum(root.right);
            return max(cross, left, right);
        }

        private int maxPath(TreeNode root) {
            if (root == null) return 0;
            if (root.left == null && root.right == null) return Math.max(0, root.val);
            return Math.max(0, max(0, maxPath(root.left), maxPath(root.right)) + root.val);
        }

        private int max(int... nums) {
            int max = nums[0];
            for (int num : nums) {
                if (num > max) max = num;
            }
            return max;
        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}
