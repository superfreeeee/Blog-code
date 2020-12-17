package leetcode.editor.cn;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Queue;

public class P515FindLargestValueInEachTreeRow {
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
        public List<Integer> largestValues(TreeNode root) {
            List<Integer> res = new ArrayList<>();
            if(root == null) return res;
            Queue<TreeNode> Q = new LinkedList<>();
            Q.add(root);
            while(Q.size() > 0) {
                int curMax = Q.peek().val;
                int size = Q.size();
                while(size-- > 0) {
                    TreeNode t = Q.poll();
                    if(t.val > curMax) curMax = t.val;
                    if(t.left != null) Q.add(t.left);
                    if(t.right != null) Q.add(t.right);
                }
                res.add(curMax);
            }
            return res;
        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}