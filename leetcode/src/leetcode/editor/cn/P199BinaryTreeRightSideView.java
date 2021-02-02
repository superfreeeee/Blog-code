package leetcode.editor.cn;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

public class P199BinaryTreeRightSideView {
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
        public List<Integer> rightSideView(TreeNode root) {
            List<Integer> res = new ArrayList<>();
            if(root == null) return res;

            LinkedList<TreeNode> Q = new LinkedList<>();
            Q.add(root);
            while(Q.size() > 0) {
                res.add(Q.getLast().val);
                int size = Q.size();
                while(size-- > 0) {
                    TreeNode t = Q.poll();
                    if(t.left != null) Q.add(t.left);
                    if(t.right != null) Q.add(t.right);
                }
            }
            return res;
        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}
