package leetcode.editor.cn;

import java.util.HashMap;
import java.util.Map;

public class P543DiameterOfBinaryTree {
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
        private int ans = 1;

        public int diameterOfBinaryTree(TreeNode root) {
            if (root == null) return 0;
            dfs(root);
            return ans - 1;
        }

        private int dfs(TreeNode t) {
            if (t == null) return 0;
            int L = dfs(t.left);
            int R = dfs(t.right);
            ans = Math.max(ans, L + R + 1);
            return Math.max(L, R) + 1;
        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}