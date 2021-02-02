package leetcode.editor.cn;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Queue;

public class P637AverageOfLevelsInBinaryTree {
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
        public List<Double> averageOfLevels(TreeNode root) {
            List<Double> res = new ArrayList<>();
            if (root == null) return res;
            Queue<TreeNode> Q = new LinkedList<>();
            Q.add(root);
            while (Q.size() > 0) {
                int size = Q.size();
                List<Integer> nums = new ArrayList<>();
                while (size-- > 0) {
                    TreeNode cur = Q.poll();
                    nums.add(cur.val);
                    if (cur.left != null) Q.add(cur.left);
                    if (cur.right != null) Q.add(cur.right);
                }
                double ans = 0;
                for (int num : nums) ans += num;
                ans /= nums.size();
                res.add(ans);
            }
            return res;
        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}