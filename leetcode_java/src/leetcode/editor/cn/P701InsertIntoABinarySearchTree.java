package leetcode.editor.cn;

public class P701InsertIntoABinarySearchTree {
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
        public TreeNode insertIntoBST(TreeNode root, int val) {
            if(root == null) {
                return new TreeNode(val);
            }
            TreeNode y = null, x = root;
            while(x != null) {
                y = x;
                x = val < x.val ? x.left : x.right;
            }
            if(val < y.val) {
                y.left = new TreeNode(val);
            } else {
                y.right = new TreeNode(val);
            }
            return root;
        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}
