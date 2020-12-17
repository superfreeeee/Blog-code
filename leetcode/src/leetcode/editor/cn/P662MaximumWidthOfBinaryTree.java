package leetcode.editor.cn;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Queue;

public class P662MaximumWidthOfBinaryTree {
    public static void main(String[] args) {
    }

    public class TreeNode {
        int val;
        TreeNode left;
        TreeNode right;

        TreeNode() {
        }

        TreeNode(int val) {
            this.val = val;
        }

        TreeNode(int val, TreeNode left, TreeNode right) {
            this.val = val;
            this.left = left;
            this.right = right;
        }
    }
    //leetcode submit region begin(Prohibit modification and deletion)

    /**
     * Definition for a binary tree node.
     * public class TreeNode {
     * int val;
     * TreeNode left;
     * TreeNode right;
     * TreeNode() {}
     * TreeNode(int val) { this.val = val; }
     * TreeNode(int val, TreeNode left, TreeNode right) {
     * this.val = val;
     * this.left = left;
     * this.right = right;
     * }
     * }
     */
    class Solution {


        public int widthOfBinaryTree(TreeNode root) {
            if(root == null) return 0;
            Queue<NodePos> Q = new LinkedList<>();
            Q.add(new NodePos(root, 1));
            int ans = 0;
            while (Q.size() > 0) {
                LinkedList<NodePos> layer = new LinkedList<>();
                while (Q.size() > 0) layer.add(Q.poll());
                int w = layer.getLast().pos - layer.getFirst().pos + 1;
                ans = Math.max(ans, w);
                for(NodePos np : layer) {
                    TreeNode t = np.t;
                    if(t.left != null) Q.add(new NodePos(t.left, np.pos * 2));
                    if(t.right != null) Q.add(new NodePos(t.right, np.pos * 2 + 1));
                }
            }
            return ans;
        }

        class NodePos {
            TreeNode t;
            int pos;

            public NodePos(TreeNode t, int pos) {
                this.t = t;
                this.pos = pos;
            }
        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}