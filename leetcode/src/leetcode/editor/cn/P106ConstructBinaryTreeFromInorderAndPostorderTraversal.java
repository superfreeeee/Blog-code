package leetcode.editor.cn;
public class P106ConstructBinaryTreeFromInorderAndPostorderTraversal {
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
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode(int x) { val = x; }
 * }
 */
class Solution {
    public TreeNode buildTree(int[] inorder, int[] postorder) {
        if(inorder.length == 0) return null;
        int n = inorder.length;
        return buildTree(inorder, postorder, 0, n - 1, n - 1);
    }

    private TreeNode buildTree(int[] inorder, int[] postorder, int left, int right, int center) {
        if(left > right) return null;
        if(left == right) return new TreeNode(inorder[left]);
        int mid = indexOf(inorder, postorder[center]);
        TreeNode root = new TreeNode(inorder[mid]);
        root.left = buildTree(inorder, postorder, left, mid - 1, center - (right - mid) - 1);
        root.right = buildTree(inorder, postorder, mid + 1, right, center - 1);
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
