package leetcode.editor.cn;

import java.util.*;

public class P863AllNodesDistanceKInBinaryTree {
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
        private Map<TreeNode, TreeNode> parent = new HashMap<>();

        public List<Integer> distanceK(TreeNode root, TreeNode target, int K) {
            dfs(root, null);

            Queue<TreeNode> Q = new LinkedList<>();
            Q.add(null);
            Q.add(target);
            Set<TreeNode> appear = new HashSet<>();
            appear.add(target);
            appear.add(null);
            int depth = 0;
            while (Q.size() > 0) {
                TreeNode cur = Q.poll();
                if (cur == null) {
                    if (depth == K) {
                        List<Integer> res = new ArrayList<>();
                        for (TreeNode t : Q) res.add(t.val);
                        return res;
                    }
                    depth++;
                    Q.offer(null);
                } else {
                    if(!appear.contains(cur.left)) {
                        Q.add(cur.left);
                        appear.add(cur.left);
                    }
                    if(!appear.contains(cur.right)) {
                        Q.add(cur.right);
                        appear.add(cur.right);
                    }
                    TreeNode p = parent.get(cur);
                    if(!appear.contains(p)) {
                        Q.add(p);
                        appear.add(p);
                    }
                }
            }

            return new ArrayList<>();
        }

        private void dfs(TreeNode t, TreeNode par) {
            if (t != null) {
                parent.put(t, par);
                dfs(t.left, t);
                dfs(t.right, t);
            }
        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}