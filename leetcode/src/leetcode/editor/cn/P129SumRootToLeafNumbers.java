package leetcode.editor.cn;

public class P129SumRootToLeafNumbers {
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
        private int sum = 0;
        public int sumNumbers(TreeNode root) {
            gainSum(root, 0);
            return sum;
        }

        private void gainSum(TreeNode root, int cur) {
            if(root == null) return;
            cur = cur * 10 + root.val;
            if(root.left == null && root.right == null) sum += cur;
            else {
                gainSum(root.left, cur);
                gainSum(root.right, cur);
            }
        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}
