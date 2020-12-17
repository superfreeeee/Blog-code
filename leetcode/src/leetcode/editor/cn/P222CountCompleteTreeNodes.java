package leetcode.editor.cn;

public class P222CountCompleteTreeNodes {
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
        public int countNodes(TreeNode root) {
            if(root == null) return 0;
            TreeNode cur = root;
            int h = 0;
            while(cur != null) {
                h++;
                cur = cur.left;
            }
            int topCount = (int)Math.pow(2, h - 1);
            int ans = 2 * topCount - 1;
            int index = topCount - 1;
//            System.out.println(h);
//            System.out.println(topCount);
//            System.out.println(ans);
//            System.out.println(index);
            while(index > 0 && !exist(root, topCount, index--)) ans--;
            return ans;
        }

        private boolean exist(TreeNode root, int count, int index) {
            if(count == 1 && root != null) return true;
            if(root == null) return false;
            int half = count / 2;
            if(index >= half) return exist(root.right, half, index - half);
            else return exist(root.left, half, index);
        }

    }
//leetcode submit region end(Prohibit modification and deletion)

}
