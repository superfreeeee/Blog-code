package leetcode.editor.cn;

public class P783MinimumDistanceBetweenBstNodes {
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

        private int ans = Integer.MAX_VALUE;
        private TreeNode cur;

        public int minDiffInBST(TreeNode root) {
            if(root == null) return 0;
            cur = root;
            inorder(root);
            return ans;
        }

        private void inorder(TreeNode t) {
            if(t != null) {
                inorder(t.left);
                if(cur != t) {
                    ans = Math.min(ans, Math.abs(t.val - cur.val));
                    cur = t;
                }
                inorder(t.right);
            }
        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}