package leetcode.editor.cn;

import java.util.ArrayList;
import java.util.List;

public class P538ConvertBstToGreaterTree {
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
        public TreeNode convertBST(TreeNode root) {
            List<TreeNode> in = new ArrayList<>();
            inorder(root, in);
            if (in.size() >= 2) {
                for (int i = in.size() - 1; i > 0; i--) {
                    in.get(i-1).val += in.get(i).val;
                }
            }
            return root;
        }

        private void inorder(TreeNode t, List<TreeNode> list) {
            if (t != null) {
                inorder(t.left, list);
                list.add(t);
                inorder(t.right, list);
            }
        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}