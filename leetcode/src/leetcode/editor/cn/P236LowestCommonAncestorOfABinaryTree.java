package leetcode.editor.cn;

import java.util.LinkedList;
import java.util.List;

public class P236LowestCommonAncestorOfABinaryTree {
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
        public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
            List<TreeNode> pp = findPath(root, p, new LinkedList<>());
            List<TreeNode> pq = findPath(root, q, new LinkedList<>());
//            System.out.println(pp);
//            System.out.println(pq);
            int i=0;
            while(i < pp.size() && i < pq.size() && pp.get(i) == pq.get(i)) i++;
//            System.out.println(i);
            return pp.get(i - 1);
        }

        private LinkedList<TreeNode> findPath(TreeNode root, TreeNode target, LinkedList<TreeNode> path) {
            if(root == null) return null;
            path.add(root);
            if(root == target) return path;
            LinkedList<TreeNode> res = findPath(root.left, target, path);
            if(res != null) return res;
            res = findPath(root.right, target, path);
            if(res != null) return res;
            path.pollLast();
            return null;
        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}
