package leetcode.editor.cn;

public class P235LowestCommonAncestorOfABinarySearchTree {
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
        public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
            if(!contains(root, p) || !contains(root, q)) return null;
            if(contains(root.left, p) && contains(root.left, q)) return lowestCommonAncestor(root.left, p, q);
            if(contains(root.right, p) && contains(root.right, q)) return lowestCommonAncestor(root.right, p, q);
            return root;
        }

        private boolean contains(TreeNode root, TreeNode target) {
            if(root == null) return false;
            if(root.val == target.val) return true;
            if(root.val > target.val) return contains(root.left, target);
            else return contains(root.right, target);
        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}
