package leetcode.editor.cn;

public class P968BinaryTreeCameras {
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
        public int minCameraCover(TreeNode root) {
            return Math.min(cover(root, true, false) + 1, cover(root, false, false));
        }

        private int cover(TreeNode t, boolean curCover, boolean recentCover) {
            if(t == null) return 0;
            if(t.left == null && t.right == null) return curCover ? 0 : 1;
            if(!curCover && !recentCover) {
                return 2 + cover(t.left, true, false) + cover(t.right, true, false);
            } else if(curCover) {
                return cover(t.left, false, true) + cover(t.right, false, true);
            } else {
                return 2;
            }

        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}