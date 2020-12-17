package leetcode.editor.cn;

public class P671SecondMinimumNodeInABinaryTree {
    public static void main(String[] args) {
//        System.out.println(1 == null);
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

        private int min;
        private int ans = -1;

        public int findSecondMinimumValue(TreeNode root) {
            if (root == null) return -1;
            min = root.val;
            dfs(root);
            return ans;
        }

        private void dfs(TreeNode t) {
            if(t != null) {
                if(t.val > min) {
                    ans = ans > -1 ? Math.min(ans, t.val) : t.val;
                } else {
                    dfs(t.left);
                    dfs(t.right);
                }
            }
        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}