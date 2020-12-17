package leetcode.editor.cn;

public class P450DeleteNodeInABst {
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

        public TreeNode deleteNode(TreeNode root, int key) {
            if (root == null) return null;
            if (root.val == key) {
                return delete(root);
            }
            TreeNode p = findParent(root, key);
            if (p == null) return root;
            if (key < p.val) p.left = delete(p.left);
            else p.right = delete(p.right);
            return root;
        }

        private TreeNode findParent(TreeNode root, int key) {
            if (root == null) return null;
            if (root.left != null && key == root.left.val ||
                    root.right != null && key == root.right.val) return root;
            if (key < root.val) return findParent(root.left, key);
            else return findParent(root.right, key);
        }

        private TreeNode delete(TreeNode t) {
            if (t.left == null) return t.right;
            if (t.right == null) return t.left;
            TreeNode pre = t.left;
            while (pre.right != null && pre.right.right != null) pre = pre.right;
            if (pre.right == null) {
                pre.right = t.right;
                return pre;
            } else {
                TreeNode root = pre.right;
                pre.right = delete(pre.right);
                root.left = t.left;
                root.right = t.right;
                return root;
            }

        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}
