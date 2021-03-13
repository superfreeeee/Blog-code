package leetcode.editor.cn;

public class P101SymmetricTree {
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
        public boolean isSymmetric(TreeNode root) {
            return root == null || isSymmetric(root.left, root.right);
        }

        private boolean isSymmetric(TreeNode a, TreeNode b) {
            if(a == null && b == null) {
                return true;
            }
            if(a == null || b == null) {
                return false;
            }
//            System.out.println(a.val + " " + b.val);
            return a.val == b.val && isSymmetric(a.left, b.right) && isSymmetric(a.right, b.left);
        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}
