package leetcode.editor.cn;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;

public class P96UniqueBinarySearchTrees {
    public static void main(String[] args) {
    }

    public class TreeNode {
        int val;
        P95UniqueBinarySearchTreesIi.TreeNode left;
        P95UniqueBinarySearchTreesIi.TreeNode right;

        TreeNode() {
        }

        TreeNode(int val) {
            this.val = val;
        }

        TreeNode(int val, P95UniqueBinarySearchTreesIi.TreeNode left, P95UniqueBinarySearchTreesIi.TreeNode right) {
            this.val = val;
            this.left = left;
            this.right = right;
        }
    }

    //leetcode submit region begin(Prohibit modification and deletion)
    class Solution {

        public int numTrees(int n) {
            int[] res = new int[n + 1];
            res[0] = res[1] = 1;
            for (int i = 2; i <= n; i++) {
                for (int j = 1; j <= i; j++) {
                    res[i] += res[j - 1] * res[i - j];
                }
            }
            return res[n];
        }

//        public int numTrees(int n) {
//            if (n == 0) {
//                return 0;
//            }
//            return numTrees(1, n);
//        }
//
//        Map<Integer, Map<Integer, Integer>> record = new HashMap<>();
//
//        private int numTrees(int l, int r) {
//            if(l >= r) {
//                return 1;
//            }
//            if(record.containsKey(l) && record.get(l).containsKey(r)) {
//                return record.get(l).get(r);
//            }
//            int res = 0;
//            for(int i=l ; i<=r ; i++) {
//                int left = numTrees(l, i-1);
//                int right = numTrees(i+1, r);
//                res += left * right;
//            }
//            if(!record.containsKey(l)) record.put(l, new HashMap<>());
//            record.get(l).put(r, res);
//            return res;
//        }

    }
//leetcode submit region end(Prohibit modification and deletion)

}
