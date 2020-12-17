package leetcode.editor.cn;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Queue;

public class P107BinaryTreeLevelOrderTraversalIi {
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
        public List<List<Integer>> levelOrderBottom(TreeNode root) {
            LinkedList<List<Integer>> res = new LinkedList<>();
            if(root == null) {
                return res;
            }

            Queue<TreeNode> Q = new LinkedList<>();
            Q.add(root);
            while(Q.size() > 0) {
                int size = Q.size();
                List<Integer> layer = new ArrayList<>();
                for(int i=0 ; i<size ; i++) {
                    TreeNode node = Q.poll();
                    layer.add(node.val);
                    if(node.left != null) Q.add(node.left);
                    if(node.right != null) Q.add(node.right);
                }
                res.addFirst(layer);
            }
            return res;
        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}
