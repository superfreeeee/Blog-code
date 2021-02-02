package leetcode.editor.cn;

public class P993CousinsInBinaryTree {
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
        public boolean isCousins(TreeNode root, int x, int y) {
            Pos px = parent(root, x, 0);
            Pos py = parent(root, y, 0);
//            System.out.println(px);
//            System.out.println(py);
            return px.equals(py);
        }

        private Pos parent(TreeNode root, int val, int layer) {
            if(root == null) return new Pos(null, -1);
            if(root.left != null && root.left.val == val ||
                root.right != null && root.right.val == val) return new Pos(root, layer);

            Pos p = parent(root.left, val, layer+1);
            if(p.layer >= 0) return p;
            return parent(root.right, val, layer+1);
        }

        class Pos {
            TreeNode t;
            int layer;

            public Pos(TreeNode t, int layer) {
                this.t = t;
                this.layer = layer;
            }

            public boolean equals(Pos pos) {
                return layer >= 0 && layer == pos.layer && t != pos.t;
            }

//            public String toString() {
//                return "{" + (t == null ? t : t.val) + ", " + layer + "}";
//            }
        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}