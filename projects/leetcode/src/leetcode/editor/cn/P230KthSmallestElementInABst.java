package leetcode.editor.cn;

public class P230KthSmallestElementInABst {
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
        public int kthSmallest(TreeNode root, int k) {
            if(root == null) return -1;
            int leftCount = count(root.left);
            if(k == leftCount + 1) return root.val;
            else if(k <= leftCount) return kthSmallest(root.left, k);
            else return kthSmallest(root.right, k - leftCount - 1);
        }

        private int count(TreeNode t) {
            if(t == null) return 0;
            return 1 + count(t.left) + count(t.right);
        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}
