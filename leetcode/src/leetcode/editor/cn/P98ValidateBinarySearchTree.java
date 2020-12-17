package leetcode.editor.cn;

public class P98ValidateBinarySearchTree {
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
        private long cur = Long.MIN_VALUE;
        private boolean valid = true;
        public boolean isValidBST(TreeNode root) {
            inorder(root);
            return valid;
        }

        private void inorder(TreeNode t) {
            if(t != null) {
                inorder(t.left);
                if(t.val <= cur) {
                    valid = false;
                    return;
                } else {
                    cur = t.val;
                }
                inorder(t.right);
            }
        }

    }
//leetcode submit region end(Prohibit modification and deletion)

}
