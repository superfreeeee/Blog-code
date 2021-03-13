package leetcode.editor.cn;

import java.util.ArrayList;
import java.util.List;
import java.util.Stack;

public class P145BinaryTreePostorderTraversal {
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
        public List<Integer> postorderTraversal(TreeNode root) {
            List<TreeNode> list = new ArrayList<>();
            postorder(root, list);
            List<Integer> res = new ArrayList<>();
            for (TreeNode node : list) {
                res.add(node.val);
            }
            return res;
        }

        private void postorder(TreeNode node, List<TreeNode> list) {
            if (node != null) {
                postorder(node.left, list);
                postorder(node.right, list);
                list.add(node);
            }
        }
    }

//leetcode submit region end(Prohibit modification and deletion)

}
