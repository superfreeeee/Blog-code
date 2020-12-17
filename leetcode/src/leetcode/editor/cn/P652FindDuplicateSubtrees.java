package leetcode.editor.cn;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class P652FindDuplicateSubtrees {
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
        private Map<String, Integer> recent = new HashMap<>();
        private List<TreeNode> res = new ArrayList<>();

        public List<TreeNode> findDuplicateSubtrees(TreeNode root) {
            dfs(root);
//            System.out.println(recent);
            return res;
        }

        private void dfs(TreeNode t) {
            if (t != null) {
                String ts = inorder(t);
                recent.put(ts, recent.getOrDefault(ts, 0) + 1);
                if (recent.get(ts) == 2) res.add(t);
                dfs(t.left);
                dfs(t.right);
            }
        }

        private String inorder(TreeNode t) {
            if (t == null) return "#";
            return t.val + "," + inorder(t.left) + "," + inorder(t.right);
        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}