package leetcode.editor.cn;

import java.util.ArrayList;
import java.util.List;

public class P872LeafSimilarTrees {
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

        private List<Integer> leaves = new ArrayList<>();
        private int i = 0;

        public boolean leafSimilar(TreeNode root1, TreeNode root2) {
            traverse(root1);
            System.out.println(leaves);
            return check(root2) && i == leaves.size();
        }

        private void traverse(TreeNode t) {
            if(t != null) {
                if(t.left == null && t.right == null) leaves.add(t.val);
                traverse(t.left);
                traverse(t.right);
            }
        }

        private boolean check(TreeNode t) {
            if(t == null) return true;
            if(t.left == null && t.right == null &&
                    (i >= leaves.size() || leaves.get(i++) != t.val)) return false;
            return check(t.left) && check(t.right);
        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}