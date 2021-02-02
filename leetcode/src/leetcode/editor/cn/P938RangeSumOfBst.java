package leetcode.editor.cn;

public class P938RangeSumOfBst {
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

        private int ans = 0;

        public int rangeSumBST(TreeNode root, int L, int R) {
            dfs(root, L, R);
            return ans;
        }

        private void dfs(TreeNode root, int L, int R) {
            if(root == null) return;
            if(L <= root.val && root.val <= R) ans += root.val;
            if(root.val >= L) dfs(root.left, L, R);
            if(root.val <= R) dfs(root.right, L, R);
        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}