package leetcode.editor.cn;

public class P437PathSumIii {
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
        public int pathSum(TreeNode root, int sum) {
            if (root == null) return 0;
            return pathSum(root, sum, false);
        }

        private int pathSum(TreeNode root, int sum, boolean selected) {
            if(root == null) return 0;
            int ans = root.val == sum ? 1 : 0;
            ans += pathSum(root.left, sum - root.val, true) + pathSum(root.right, sum - root.val, true);
            if(!selected) ans += pathSum(root.left, sum, false) + pathSum(root.right, sum, false);
            return ans;
        }

        /*
        [5,4,8,11,null,13,4,7,2,null,null,5,1]
		22
        [10,5,-3,3,2,null,11,3,-2,null,1]
        8
        [5,3,2,3,-2,null,1]
        8
        [-3,null,11]
        8
        */
    }
//leetcode submit region end(Prohibit modification and deletion)

}
