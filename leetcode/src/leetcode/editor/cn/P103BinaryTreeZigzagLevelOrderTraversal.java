package leetcode.editor.cn;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

public class P103BinaryTreeZigzagLevelOrderTraversal {
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
        public List<List<Integer>> zigzagLevelOrder(TreeNode root) {
            LinkedList<TreeNode> q = new LinkedList<>();
            q.add(root);
            boolean left = false;

            List<List<Integer>> res = new ArrayList<>();
            while (q.size() > 0) {
                LinkedList<TreeNode> q2 = new LinkedList<>();
                List<Integer> layer = new ArrayList<>();
                for (TreeNode node : q) {
                    if (node != null) {
                        layer.add(node.val);
                    }
                }
                while (q.size() > 0) {
                    TreeNode node = q.pollLast();
                    if (node == null) {
                        continue;
                    }
                    if (left) {
                        q2.add(node.left);
                        q2.add(node.right);
                    } else {
                        q2.add(node.right);
                        q2.add(node.left);
                    }
                }
                q = q2;
                left = !left;
                if (layer.size() > 0) {
                    res.add(layer);
                }
            }
            return res;
        }
    }

//leetcode submit region end(Prohibit modification and deletion)

}
