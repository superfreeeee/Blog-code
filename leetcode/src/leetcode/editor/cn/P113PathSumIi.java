package leetcode.editor.cn;

import java.util.ArrayList;
import java.util.List;

public class P113PathSumIi {
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
        private List<List<Integer>> res = new ArrayList<>();

        public List<List<Integer>> pathSum(TreeNode root, int sum) {
            if (root == null) return res;
            findPath(root, sum, new ArrayList<>());
            return res;
        }

        private void findPath(TreeNode root, int target, List<Integer> path) {
            path.add(root.val);
            target -= root.val;
            if (root.left == null && root.right == null && target == 0) {
                res.add(path);
            } else {
                if (root.left != null) findPath(root.left, target, new ArrayList<>(path));
                if (root.right != null) findPath(root.right, target, new ArrayList<>(path));
            }

        }

    }
//leetcode submit region end(Prohibit modification and deletion)

}
