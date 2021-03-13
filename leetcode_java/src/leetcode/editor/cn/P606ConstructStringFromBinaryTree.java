package leetcode.editor.cn;

public class P606ConstructStringFromBinaryTree {
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

        public String tree2str(TreeNode t) {
            if(t == null) return "";
            if(t.left == null && t.right == null) return String.valueOf(t.val);
            return t.val + "(" + tree2str(t.left) + ")" +
                    (t.right == null ? "" : "(" + tree2str(t.right) + ")");
        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}