package leetcode.editor.cn;

import java.util.*;

public class P501FindModeInBinarySearchTree {
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
//        private Map<Integer, Integer> numCounts = new HashMap<>();
//        private int maxCount;
//
//        public int[] findMode(TreeNode root) {
//            inorder(root);
//            List<Integer> res = new ArrayList<>();
//            for(Integer num : numCounts.keySet()) {
//                if(numCounts.get(num) == maxCount) {
//                    res.add(num);
//                }
//            }
//            return res.stream().mapToInt(Integer::valueOf).toArray();
//        }
//
//        private void inorder(TreeNode t) {
//            if(t != null) {
//                inorder(t.left);
//                int count = numCounts.getOrDefault(t.val, 0) + 1;
//                numCounts.put(t.val, count);
//                if(maxCount < count) {
//                    maxCount = count;
//                }
//                inorder(t.right);
//            }
//        }

        private int currentNum = 0, count = 0, maxCount = 0;
        private List<Integer> res = new ArrayList<>();

        public int[] findMode(TreeNode root) {
            TreeNode cur = root, pre = null;
            while (cur != null) {
                if (cur.left == null) {
                    push(cur.val);
                    cur = cur.right;
                    continue;
                }
                pre = cur.left;
                while (pre.right != null && pre.right != cur) {
                    pre = pre.right;
                }
                if (pre.right != cur) {
                    pre.right = cur;
                    cur = cur.left;
                    continue;
                } else {
                    pre.right = null;
                    push(cur.val);
                    cur = cur.right;
                }
            }
            return res.stream().mapToInt(Integer::valueOf).toArray();
        }

        private void push(int num) {
            if (num == currentNum) {
                count++;
            } else {
                currentNum = num;
                count = 1;
            }
            if (count == maxCount) {
                res.add(currentNum);
            } else if (count > maxCount) {
                maxCount = count;
                res.clear();
                res.add(currentNum);
            }
        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}
