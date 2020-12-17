package leetcode.editor.cn;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

public class P894AllPossibleFullBinaryTrees {
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
        private LinkedList<List<TreeNode>> possible = new LinkedList<>();

        public List<TreeNode> allPossibleFBT(int N) {
            if (N % 2 == 0) return new ArrayList<>();
            for (int i = 1; i <= N; i += 2) {
                build(i);
            }
            return possible.getLast();
        }

        private void build(int size) {
            List<TreeNode> res = new ArrayList<>();
            if (size == 1) {
                res.add(new TreeNode(0));
            } else {
//                System.out.println("build " + size);
                for (int i = 1; i < size; i += 2) {
//                    System.out.println("left size: " + (i / 2));
//                    System.out.println("right size: " + ((size - i - 1) / 2));
                    List<TreeNode> leftPos = possible.get(i / 2);
                    List<TreeNode> rightPos = possible.get((size - i - 1) / 2);
                    for (TreeNode L : leftPos) {
                        for (TreeNode R : rightPos) {
                            TreeNode root = new TreeNode(0);
                            root.left = L;
                            root.right = R;
                            res.add(root);
                        }
                    }
                }
            }
            possible.add(res);
        }


    }
//leetcode submit region end(Prohibit modification and deletion)

}