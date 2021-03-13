package leetcode.editor.cn;

public class P654MaximumBinaryTree {
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
        public TreeNode constructMaximumBinaryTree(int[] nums) {
            return build(nums, 0, nums.length - 1);
        }

        private TreeNode build(int[] nums, int l, int r) {
            if(l > r) return null;
            if(l == r) return new TreeNode(nums[l]);
            int root = l;
            for(int i=l+1 ; i<=r ; i++) {
                if(nums[i] > nums[root]) root = i;
            }
            TreeNode t = new TreeNode(nums[root]);
            t.left = build(nums, l, root - 1);
            t.right = build(nums, root + 1, r);
            return t;
        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}