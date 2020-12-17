package leetcode.editor.cn;


import java.util.Arrays;

public class P684RedundantConnection {
    public static void main(String[] args) {
    }

    //leetcode submit region begin(Prohibit modification and deletion)
    class Solution {
        public int[] findRedundantConnection(int[][] edges) {
            int n = edges.length;
            int[] parent = new int[n + 1];
            for (int i = 0; i <= n; i++) {
                parent[i] = i;
            }
            for (int[] edge : edges) {
                if (find(parent, edge[0]) == find(parent, edge[1])) {
                    return edge;
                }
                union(parent, edge[0], edge[1]);
//                System.out.println(Arrays.toString(parent));
            }
            return null;
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
            int px = find(parent, x), py = find(parent, y);
            for(int i=0 ; i<parent.length ; i++) {
                if(parent[i] == py) parent[i] = px;
            }
        }
    }
//leetcode submit region end(Prohibit modification and deletion)

}