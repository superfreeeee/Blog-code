package leetcode.editor.cn;

public class P226InvertBinaryTree {
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
        public TreeNode invertTree(TreeNode root) {
            if(root == null) {
                return null;
            }
            TreeNode t = root.left;
            root.left = root.right;
            root.right = t;
            root.left = invertTree(root.left);
            root.right = invertTree(root.right);
            return root;
        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}
