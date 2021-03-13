package leetcode.editor.cn;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class P653TwoSumIvInputIsABst {
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

        private List<Integer> nums = new ArrayList<>();
        public boolean findTarget(TreeNode root, int k) {
            inorder(root);
            Set<Integer> res = new HashSet<>();
            for(int num : nums) {
                if(res.contains(num)) return true;
                res.add(k - num);
//                System.out.println(res);
            }
            return false;
        }

        private void inorder(TreeNode t) {
            if(t != null) {
                inorder(t.left);
                nums.add(t.val);
                inorder(t.right);
            }
        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}