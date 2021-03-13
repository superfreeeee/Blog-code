package leetcode.editor.cn;

import java.util.LinkedList;
import java.util.Queue;

public class P513FindBottomLeftTreeValue {
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
        public int findBottomLeftValue(TreeNode root) {
            if(root == null) return 0;
            Queue<TreeNode> Q = new LinkedList<>();
            Q.add(root);
            int ans = 0;
            while(Q.size() > 0) {
                ans = Q.peek().val;
                int size = Q.size();
                while(size-- > 0) {
                    TreeNode t = Q.poll();
                    if(t.left != null) Q.add(t.left);
                    if(t.right != null) Q.add(t.right);
                }
            }
            return ans;
        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}