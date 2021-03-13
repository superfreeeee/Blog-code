package leetcode.editor.cn;

public class P530MinimumAbsoluteDifferenceInBst {
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

        private int cur = -1, gap = Integer.MAX_VALUE;

        public int getMinimumDifference(TreeNode root) {
            inorder(root);
            return gap;
        }

        private void inorder(TreeNode t) {
            if(t != null) {
                inorder(t.left);
                System.out.println(t.val + " " + cur);
                if(cur < 0) {
                    cur = t.val;
                }
                if(t.val != cur) {
                    int d = t.val - cur;
                    if(d < gap) gap = d;
                    cur = t.val;
                }
                inorder(t.right);
            }
        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}
