package leetcode.editor.cn;

public class P563BinaryTreeTilt {
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
        public int findTilt(TreeNode root) {
            sum(root);
            return ans;
        }

        private int sum(TreeNode t) {
            if(t == null) return 0;
            int L = sum(t.left);
            int R = sum(t.right);
            ans += Math.abs(L - R);
            return L + R + t.val;
        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}