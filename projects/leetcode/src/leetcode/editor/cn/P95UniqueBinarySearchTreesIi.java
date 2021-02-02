package leetcode.editor.cn;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

public class P95UniqueBinarySearchTreesIi {
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
        public List<TreeNode> generateTrees(int n) {
            if(n == 0) {
                return new LinkedList<>();
            }
            return generateTrees(1, n);
        }

        private List<TreeNode> generateTrees(int l, int r) {
            List<TreeNode> res = new LinkedList<>();
            if(l > r) {
                res.add(null);
                return res;
            }
            for(int i=l ; i<=r ; i++) {
                List<TreeNode> leftRes = generateTrees(l, i-1);
                List<TreeNode> rightRes = generateTrees(i+1, r);
                for(TreeNode left : leftRes) {
                    for(TreeNode right : rightRes) {
                        TreeNode cur = new TreeNode(i);
                        cur.left = left;
                        cur.right = right;
                        res.add(cur);
                    }
                }
            }
            return res;
        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}
