package leetcode.editor.cn;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Stack;

public class P99RecoverBinarySearchTree {
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

        private List<TreeNode> nodes = new ArrayList<>();
        private List<Integer> dec = new ArrayList<>(2);

        public void recoverTree(TreeNode root) {
            if(root == null) return;
            inorder(root);

            for(int i=0, size=nodes.size()-1 ; i<size ; i++) {
                if(nodes.get(i).val > nodes.get(i+1).val) dec.add(i);
            }
            if(dec.size() == 1) {
                int i = dec.get(0);
                int tmp = nodes.get(i).val;
                nodes.get(i).val = nodes.get(i + 1).val;
                nodes.get(i + 1).val = tmp;
            } else {
                int i = dec.get(0), j = dec.get(1);
                int tmp = nodes.get(i).val;
                nodes.get(i).val = nodes.get(j + 1).val;
                nodes.get(j + 1).val = tmp;
            }
        }

        private void inorder(TreeNode t) {
            if(t != null) {
                inorder(t.left);
                nodes.add(t);
                inorder(t.right);
            }
        }

    }
//leetcode submit region end(Prohibit modification and deletion)

}
