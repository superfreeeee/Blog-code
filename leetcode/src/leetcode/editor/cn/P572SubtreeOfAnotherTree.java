package leetcode.editor.cn;

public class P572SubtreeOfAnotherTree {
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

        private boolean ans = false;

        public boolean isSubtree(TreeNode s, TreeNode t) {
            dfs(s, t);
            return ans;
        }

        private void dfs(TreeNode s, TreeNode t) {
            ans = same(s, t);
            if(ans) return;
            if(s != null) {
                dfs(s.left, t);
                if(ans) return;
                dfs(s.right, t);
            }
        }

        private boolean same(TreeNode a, TreeNode b) {
            if (a == null && b == null) return true;
            if (a == null || b == null) return false;
            return a.val == b.val && same(a.left, b.left) && same(a.right, b.right);
        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}