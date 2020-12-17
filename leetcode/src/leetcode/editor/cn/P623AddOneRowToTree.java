package leetcode.editor.cn;

import java.util.LinkedList;
import java.util.Queue;

public class P623AddOneRowToTree {
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
        public TreeNode addOneRow(TreeNode root, int v, int d) {
            if(d == 1) {
                TreeNode head = new TreeNode(v);
                head.left = root;
                return head;
            }
            if(root == null) return new TreeNode(v);
            Queue<TreeNode> Q = new LinkedList<>();
            Q.add(root);
            d -= 2;
            while(d-- > 0) {
                int size = Q.size();
                while(size-- > 0) {
                    TreeNode t = Q.poll();
                    if(t.left != null) Q.add(t.left);
                    if(t.right != null) Q.add(t.right);
                }
            }
            while(Q.size() > 0) {
                TreeNode t = Q.poll();
                TreeNode L = new TreeNode(v);
                L.left = t.left;
                t.left = L;
                TreeNode R = new TreeNode(v);
                R.right = t.right;
                t.right = R;
            }
            return root;
        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}