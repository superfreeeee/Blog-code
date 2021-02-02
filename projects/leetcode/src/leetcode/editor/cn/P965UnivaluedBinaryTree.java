package leetcode.editor.cn;

public class P965UnivaluedBinaryTree {
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
        private int cur;
        private boolean res = true;

        public boolean isUnivalTree(TreeNode root) {
            if(root == null) return false;
            cur = root.val;
            dfs(root);
            return res;
        }

        private void dfs(TreeNode t) {
            if(t != null) {
                if(t.val != cur) res = false;
                else {
                    dfs(t.left);
                    dfs(t.right);
                }
            }
        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}