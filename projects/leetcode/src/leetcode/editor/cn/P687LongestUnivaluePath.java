package leetcode.editor.cn;

public class P687LongestUnivaluePath {
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

        public int longestUnivaluePath(TreeNode root) {
            if(root == null) return 0;
            len(root);
            return ans;
        }

        private int len(TreeNode root) {
            if(root == null) return 0;
            int L = len(root.left);
            int R = len(root.right);
            int cur = 0;
            if(root.left != null && root.left.val == root.val) cur += L;
            if(root.right != null && root.right.val == root.val) cur += R;
            ans = Math.max(ans, cur);

            int len = 0;
            if(root.left != null && root.left.val == root.val) len = Math.max(len, L);
            if(root.right != null && root.right.val == root.val) len = Math.max(len, R);
            return len + 1;
        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}