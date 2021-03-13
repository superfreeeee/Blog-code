package leetcode.editor.cn;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class P655PrintBinaryTree {
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
        public List<List<String>> printTree(TreeNode root) {
            int h = height(root);
            int w = (int) Math.pow(2, h) - 1;
            String[][] res = new String[h][w];
            for (int i = 0; i < h; i++) {
                for (int j = 0; j < w; j++) {
                    res[i][j] = "";
                }
            }
            fill(res, root, 0, w - 1, 0);
            List<List<String>> ans = new ArrayList<>();
            for (String[] row : res) {
                ans.add(Arrays.asList(row));
            }
            return ans;
        }

        private void fill(String[][] res, TreeNode t, int wx, int wy, int h) {
            if (t == null) return;
            int mid = (wx + wy) / 2;
            res[h][mid] = String.valueOf(t.val);
            fill(res, t.left, wx, mid - 1, h + 1);
            fill(res, t.right, mid + 1, wy, h + 1);
        }

        private int height(TreeNode root) {
            if (root == null) return 0;
            return Math.max(height(root.left), height(root.right)) + 1;
        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}