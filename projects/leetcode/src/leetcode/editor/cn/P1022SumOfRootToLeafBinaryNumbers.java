package leetcode.editor.cn;

import java.util.ArrayList;
import java.util.List;

public class P1022SumOfRootToLeafBinaryNumbers {
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
        private int ans = 0;

        public int sumRootToLeaf(TreeNode root) {
            dfs(root, 0);
            return ans;
        }

        private void dfs(TreeNode t, int cur) {
            if(t != null) {
                cur = cur * 2 + t.val;
                if(t.left == null && t.right == null) {
                    ans += cur;
                } else {
                    dfs(t.left, cur);
                    dfs(t.right, cur);
                }
            }
        }

    }
//leetcode submit region end(Prohibit modification and deletion)

}