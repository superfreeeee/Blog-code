package leetcode.editor.cn;

public class P105ConstructBinaryTreeFromPreorderAndInorderTraversal {
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
        public TreeNode buildTree(int[] preorder, int[] inorder) {
            if(preorder.length == 0) return null;
            return buildTree(preorder, 0, inorder, 0, inorder.length-1);
        }

        private TreeNode buildTree(int[] preorder, int center, int[] inorder, int left, int right) {
            if(left > right) return null;
            if(left == right) return new TreeNode(inorder[left]);

            TreeNode root = new TreeNode(preorder[center]);
            int mid = indexOf(inorder, preorder[center]);
            root.left = buildTree(preorder, center + 1, inorder, left, mid - 1);
            root.right = buildTree(preorder, center + (mid - left) + 1, inorder, mid + 1, right);
            return root;
        }

        private int indexOf(int[] A, int num) {
            for(int i=0 ; i<A.length ; i++) {
                if(A[i] == num) return i;
            }
            return -1;
        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}
