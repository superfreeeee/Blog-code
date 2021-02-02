package leetcode.editor.cn;

import java.util.HashSet;
import java.util.LinkedList;
import java.util.Queue;
import java.util.Set;

public class P958CheckCompletenessOfABinaryTree {
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
        public boolean isCompleteTree(TreeNode root) {
            if (root == null) return true;
            Queue<TreeNode> Q = new LinkedList<>();
            Q.add(root);
            boolean meetNull = false;
            while (!meetNull) {
                int size = Q.size();
                while (size-- > 0) {
                    TreeNode cur = Q.poll();
                    if (cur.left == null || cur.right == null) meetNull = true;
                    Q.offer(cur.left);
                    Q.offer(cur.right);
                }
            }
            while(Q.peek() != null) {
                TreeNode t = Q.poll();
                if(t.left != null || t.right != null) return false;
            }
            for(TreeNode t : Q) {
                if(t != null) return false;
            }
            return true;
        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}