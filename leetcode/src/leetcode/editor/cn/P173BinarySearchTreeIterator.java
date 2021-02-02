package leetcode.editor.cn;

import java.util.LinkedList;

public class P173BinarySearchTreeIterator {
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
    class BSTIterator {

        private LinkedList<TreeNode> history = new LinkedList<TreeNode>();

        public BSTIterator(TreeNode root) {
            insertMinPath(root);
        }

        private void insertMinPath(TreeNode root) {
            while (root != null) {
                history.addFirst(root);
                root = root.left;
            }
        }

        /**
         * @return the next smallest number
         */
        public int next() {
            TreeNode cur = history.pollFirst();
            int res = cur.val;

            if (cur.right != null) {
                insertMinPath(cur.right);
            }

            return res;
        }

        /**
         * @return whether we have a next smallest number
         */
        public boolean hasNext() {
            return history.size() > 0;
        }
    }

/**
 * Your BSTIterator object will be instantiated and called as such:
 * BSTIterator obj = new BSTIterator(root);
 * int param_1 = obj.next();
 * boolean param_2 = obj.hasNext();
 */

//leetcode submit region end(Prohibit modification and deletion)

}
