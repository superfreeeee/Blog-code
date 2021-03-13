package leetcode.editor.cn;

import java.util.Arrays;

public class P685RedundantConnectionIi {
    public static void main(String[] args) {
    }

    //leetcode submit region begin(Prohibit modification and deletion)
    class Solution {
        public int[] findRedundantDirectedConnection(int[][] edges) {
            int n = edges.length;
            int[] parent = new int[n + 1];
            for (int i = n - 1; i >= 0; i--) {
                reset(parent);
//                System.out.println(i);
//                System.out.println(Arrays.toString(parent));

                for (int j = 0; j < n; j++) {
                    if (i != j) {
                        int[] edge = edges[j];
                        union(parent, edge[0], edge[1]);
                    }
                }
//                System.out.println(Arrays.toString(parent));
                if(singleRoot(parent)) return edges[i];
            }

            return null;
        }

        private void reset(int[] parent) {
            for (int i = 0; i < parent.length; i++) {
                parent[i] = i;
            }
        }

        private boolean singleRoot(int[] parent) {
            int root = parent[1];
            for (int i = 2; i < parent.length; i++) {
                if (parent[i] != root) return false;
            }
            return true;
        }

        private int find(int[] parent, int x) {
            int p = parent[x];
            while (x != p) {
                x = p;
                p = parent[x];
            }
            return p;
        }

        private void union(int[] parent, int x, int y) {
            int px = find(parent, x);
            parent[y] = px;
            for (int i = 0; i < parent.length; i++) {
                if (parent[i] == y) parent[i] = px;
            }
        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}