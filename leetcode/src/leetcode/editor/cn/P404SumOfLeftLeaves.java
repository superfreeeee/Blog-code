package leetcode.editor.cn;

public class P404SumOfLeftLeaves {
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
        public int sumOfLeftLeaves(TreeNode root) {
            if(root == null) return 0;
            int sum = 0;
            sum += countSubLeft(root.left);
            sum += sumOfLeftLeaves(root.right);
            return sum;
        }

        private int countSubLeft(TreeNode root) {
            if(root == null) return 0;
            if(root.left == null && root.right == null) return root.val;
            int sum = 0;
            sum += countSubLeft(root.left);
            sum += sumOfLeftLeaves(root.right);
            return sum;
        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}
