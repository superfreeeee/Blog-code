package leetcode.editor.cn;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class P508MostFrequentSubtreeSum {
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
        private Map<Integer, Integer> subSum = new HashMap<>();
        private int maxCount = 0;

        public int[] findFrequentTreeSum(TreeNode root) {
            dfs(root);
            List<Integer> result = new ArrayList<>();
            for(Integer key : subSum.keySet()) {
                if(subSum.get(key) == maxCount) {
                    result.add(key);
                }
            }
            return result.stream().mapToInt(Integer::valueOf).toArray();
        }

        private int dfs(TreeNode t) {
            if(t == null) return 0;
            int L = dfs(t.left);
            int R = dfs(t.right);
            int sum = L + R + t.val;
            int count = subSum.getOrDefault(sum, 0) + 1;
            subSum.put(sum, count);
            if(count > maxCount) maxCount = count;
            return sum;
        }

    }
//leetcode submit region end(Prohibit modification and deletion)

}