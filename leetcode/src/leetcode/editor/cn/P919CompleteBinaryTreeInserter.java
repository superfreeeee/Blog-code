package leetcode.editor.cn;

import java.util.ArrayList;
import java.util.List;

public class P919CompleteBinaryTreeInserter {
    public static void main(String[] args) {
        CBTInserter tree = new P919CompleteBinaryTreeInserter().new CBTInserter(new TreeNode(1));
        tree.insert(2);

    }

    public static class TreeNode {
        int val;
        TreeNode left;
        TreeNode right;

        TreeNode(int x) {
            val = x;
        }

        @Override
        public String toString() {
            return val + "{" + (left == null ? "" : left.toString()) + "," + (right == null ? "" : right.toString()) + "}";
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
    class CBTInserter {

        private TreeNode root;
        private int size = 0;
        private int idx = 0;

        public CBTInserter(TreeNode root) {
            this.root = root;
            inorder(root);
            int base = 1;
            while (base * 2 + 1 <= size) base = base * 2 + 1;
            this.idx = size - base;
            this.size = base;
        }

        private void inorder(TreeNode t) {
            if (t != null) {
                inorder(t.left);
                size++;
                inorder(t.right);
            }
        }

        private TreeNode build(List<TreeNode> in, int L, int R, int size, int idx) {
            if (L > R) return null;
            if (L == R) return in.get(L);
            int left = Math.min(idx, (size + 1) / 2);
            int M = left + (size / 2);
            TreeNode root = in.get(M);
            root.left = build(in, L, M - 1, (size - 1) / 2 + left, left);
            root.right = build(in, M + 1, R, (size - 1) / 2, idx - left);
            return root;
        }

        public int insert(int v) {
            int res = insert(root, v, size + 1, idx + 1);
            idx++;
            if (idx == size + 1) {
                size = size * 2 + 1;
                idx = 0;
            }
            return res;
        }

        private int insert(TreeNode t, int v, int size, int idx) {
            if (size == 2) {
                if (idx == 1) t.left = new TreeNode(v);
                else t.right = new TreeNode(v);
                return t.val;
            }
            if (idx <= size / 2) return insert(t.left, v, size / 2, idx);
            else return insert(t.right, v, size / 2, idx - size / 2);
        }

        public TreeNode get_root() {
            return root;
        }
    }

/**
 * Your CBTInserter object will be instantiated and called as such:
 * CBTInserter obj = new CBTInserter(root);
 * int param_1 = obj.insert(v);
 * TreeNode param_2 = obj.get_root();
 */
//leetcode submit region end(Prohibit modification and deletion)

}