package leetcode.editor.cn;

import javax.swing.tree.TreeNode;
import java.util.ArrayList;
import java.util.List;

public class P94BinaryTreeInorderTraversal {
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
        public List<Integer> inorderTraversal(TreeNode root) {
            List<TreeNode> list = new ArrayList<>();
            inorder(root, list);
            List<Integer> res = new ArrayList<>();
            for (TreeNode node : list) {
                res.add(node.val);
            }
            return res;
        }

        private void inorder(TreeNode node, List<TreeNode> list) {
            if (node != null) {
                inorder(node.left, list);
                list.add(node);
                inorder(node.right, list);
            }
        }

    }

//leetcode submit region end(Prohibit modification and deletion)

}
