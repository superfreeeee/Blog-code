package leetcode.editor.cn;

import java.util.*;

public class P834SumOfDistancesInTree {
    public static void main(String[] args) {
    }

    //leetcode submit region begin(Prohibit modification and deletion)
    class Solution {

        private int[] dp;
        private int[] sz;
        private int[] ans;
        private List<List<Integer>> graph = new ArrayList<List<Integer>>();

        public int[] sumOfDistancesInTree(int N, int[][] edges) {
            dp = new int[N];
            sz = new int[N];
            ans = new int[N];
            for (int i = 0; i < N; i++) graph.add(new ArrayList<>());
            for (int[] p : edges) {
                int u = p[0], v = p[1];
                graph.get(u).add(v);
                graph.get(v).add(u);
            }
            dfs(0, -1);
            print();
            dfs2(0, -1);
            return ans;
        }

        private void dfs(int u, int f) {
            dp[u] = 0;
            sz[u] = 1;
            for (int v : graph.get(u)) {
                if (v == f) continue;
                dfs(v, u);
                dp[u] += dp[v] + sz[v];
                sz[u] += sz[v];
            }
        }

        private void dfs2(int u, int f) {
            ans[u] = dp[u];
            for (int v : graph.get(u)) {
                if (v == f) continue;
                int pu = dp[u], pv = dp[v];
                int zu = sz[u], zv = sz[v];
                dp[u] -= dp[v] + sz[v];
                sz[u] -= sz[v];
                dp[v] += dp[u] + sz[u];
                sz[v] += sz[u];
                dfs2(v, u);
                dp[u] = pu;
                dp[v] = pv;
                sz[u] = zu;
                sz[v] = zv;
            }
        }

        private void print() {
            System.out.println("dp: " + Arrays.toString(dp));
            System.out.println("sz: " + Arrays.toString(sz));
            System.out.println("ans: " + Arrays.toString(ans));
        }

    }
//leetcode submit region end(Prohibit modification and deletion)

}