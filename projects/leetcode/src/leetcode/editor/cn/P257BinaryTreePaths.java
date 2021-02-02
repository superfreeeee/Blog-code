package leetcode.editor.cn;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Queue;

public class P257BinaryTreePaths {
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
        public List<String> binaryTreePaths(TreeNode root) {
            if(root == null) return new ArrayList<>();
            return appendPath(root, new ArrayList<>());
        }

        private List<String> appendPath(TreeNode root, List<Integer> path) {
            path.add(root.val);
            List<String> res = new ArrayList<>();
            if(root.left == null && root.right == null) {
                StringBuilder s = new StringBuilder();
                for(int i=0 ; i<path.size() ; i++) {
                    if(i > 0) s.append("->");
                    s.append(path.get(i));
                }
                res.add(s.toString());
            } else {
                if(root.left != null) res.addAll(appendPath(root.left, new ArrayList<>(path)));
                if(root.right != null) res.addAll(appendPath(root.right, new ArrayList<>(path)));
            }
            return res;
        }

    }
//leetcode submit region end(Prohibit modification and deletion)

}
