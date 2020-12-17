package leetcode.editor.cn;

public class P865SmallestSubtreeWithAllTheDeepestNodes {
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
        private TreeNode ans;
        private int max;

        public TreeNode subtreeWithAllDeepest(TreeNode root) {
            return dfs(root).t;
        }

        private Dist dfs(TreeNode t) {
            if(t == null) return new Dist(null, 0);
            Dist L = dfs(t.left);
            Dist R = dfs(t.right);
            if(L.dist > R.dist) return new Dist(L.t, L.dist + 1);
            if(R.dist > L.dist) return new Dist(R.t, R.dist + 1);
            return new Dist(t, L.dist + 1);
        }

        class Dist {
            TreeNode t;
            int dist;

            public Dist(TreeNode t, int dist) {
                this.t = t;
                this.dist = dist;
            }
        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}