package leetcode.editor.cn;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Queue;

public class P102BinaryTreeLevelOrderTraversal {
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
        public List<List<Integer>> levelOrder(TreeNode root) {
            List<List<Integer>> res = new ArrayList<>();
            if(root == null) {
                return res;
            }
            Queue<TreeNode> Q = new LinkedList<>();
            Q.add(root);
            while(Q.size() > 0) {
                int size = Q.size();
                List<Integer> layer = new ArrayList<>();
                while(size-- > 0) {
                    TreeNode t = Q.poll();
                    layer.add(t.val);
                    if(t.left != null) Q.add(t.left);
                    if(t.right != null) Q.add(t.right);
                }
                res.add(layer);
            }
            return res;
        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}
