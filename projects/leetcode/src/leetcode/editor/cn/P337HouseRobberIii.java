package leetcode.editor.cn;

import java.util.LinkedList;
import java.util.Queue;

public class P337HouseRobberIii {
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
        public int rob(TreeNode root) {
            int[] res = dfs(root);
            return Math.max(res[0], res[1]);
        }

        private int[] dfs(TreeNode t) {
            if (t == null) return new int[]{0, 0};
            int[] l = dfs(t.left);
            int[] r = dfs(t.right);
            int select = t.val + l[1] + r[1];
            int notSelect = Math.max(l[0], l[1]) + Math.max(r[0], r[1]);
            return new int[]{select, notSelect};
        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}
