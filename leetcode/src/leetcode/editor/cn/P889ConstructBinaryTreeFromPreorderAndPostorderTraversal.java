package leetcode.editor.cn;

public class P889ConstructBinaryTreeFromPreorderAndPostorderTraversal {
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
        public TreeNode constructFromPrePost(int[] pre, int[] post) {
            return build(pre, post, 0, pre.length - 1, 0, post.length - 1);
        }

        private TreeNode build(int[] pre, int[] post, int preL, int preR, int postL, int postR) {
//            System.out.println(preL + " " + preR + " " + postL + " " + postR);
            if(preL > preR) return null;
            if(preL == preR) return new TreeNode(pre[preL]);
            TreeNode root = new TreeNode(pre[preL]);
            int preRRoot = pos(pre, post[postR - 1]);
            int postLRoot = pos(post, pre[preL + 1]);
            root.left = build(pre, post, preL + 1, preRRoot - 1, postL, postLRoot);
            root.right = build(pre, post, preRRoot, preR, postLRoot + 1, postR - 1);
            return root;
        }

        private int pos(int[] list, int val) {
            for (int i = 0; i < list.length; i++) {
                if (list[i] == val) return i;
            }
            return -1;
        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}