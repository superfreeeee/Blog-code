package leetcode.editor.cn;

public class P951FlipEquivalentBinaryTrees {
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
        public boolean flipEquiv(TreeNode root1, TreeNode root2) {
            if (root1 == root2) return true;
            if (root1 == null || root2 == null) return false;
            if (root1.val != root2.val) return false;
            int[] sub1 = extract(root1);
            int[] sub2 = extract(root2);
            if (sub1[0] == sub2[0] && sub1[1] == sub2[1])
                return flipEquiv(root1.left, root2.left) && flipEquiv(root1.right, root2.right);
            if (sub1[0] == sub2[1] && sub1[1] == sub2[0])
                return flipEquiv(root1.left, root2.right) && flipEquiv(root1.right, root2.left);
            return false;
        }

        private int[] extract(TreeNode t) {
            int[] res = new int[2];
            res[0] = t.left == null ? -1 : t.left.val;
            res[1] = t.right == null ? -1 : t.right.val;
            return res;
        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}