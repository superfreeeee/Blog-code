package leetcode.editor.cn;

import java.util.List;

public class P108ConvertSortedArrayToBinarySearchTree {
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
        public TreeNode sortedArrayToBST(int[] nums) {
            if(nums.length == 0) {
                return null;
            }
            return build(nums, 0, nums.length-1);
        }

        public TreeNode build(int[] nums, int l, int r) {
            if(l > r) return null;
            if(l == r) return new TreeNode(nums[l]);
            int mid = (r - l + 1) / 2 + l;
            TreeNode root = new TreeNode(nums[mid]);
            root.left = build(nums, l, mid - 1);
            root.right = build(nums, mid + 1, r);
            return root;
        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}
