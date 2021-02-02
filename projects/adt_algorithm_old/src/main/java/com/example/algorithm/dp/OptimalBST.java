package com.example.algorithm.dp;

import java.util.Arrays;

/**
 * 最優二叉搜索樹
 */
public class OptimalBST {

    private static int[][] e, w, root;

    /**
     * 尋找最佳二叉搜索樹結構
     * @param p
     * @param q
     */
    public static void solve(int[] p, int[] q) {
        int n = p.length;
        e = new int[n + 1][n + 1];
        w = new int[n + 1][n + 1];
        root = new int[n][n];
        // 初始化
        for(int i = 0 ; i<= n ; i++) {
            e[i][i] = w[i][i] = q[i];
        }

        for(int l = 1 ; l <= n ; l++) {
            for(int i = 1 ; i <= n - l + 1 ; i++) {
                int j = i + l - 1;
                e[i - 1][j] = Integer.MAX_VALUE;
                w[i - 1][j] = w[i - 1][j - 1] + p[j - 1] + q[j];
                for(int r = i ; r <= j ; r++) {
                    int t = e[i - 1][r - 1] + e[r][j] + w[i - 1][j];
                    if(t < e[i - 1][j]) {
                        e[i - 1][j] = t;
                        root[i - 1][j - 1] = r;
                    }
                }
            }
        }
    }

    /**
     * 重構最優解
     * @return
     */
    public static String buildRes() {
        // print e
        System.out.println("e:");
        for(int[] i : e) {
            System.out.println(Arrays.toString(i));
        }
        System.out.println();
        // print w
        System.out.println("w:");
        for(int[] i : w) {
            System.out.println(Arrays.toString(i));
        }
        System.out.println();
        // print root
        System.out.println("root:");
        for(int[] i : root) {
            System.out.println(Arrays.toString(i));
        }
        System.out.println();

        // build result
        StringBuilder res = new StringBuilder();
        buildRes(1, root.length, res);

        System.out.println(res.toString());
        return res.toString();
    }

    /**
     * 重構最優解輔助函數
     * @param i
     * @param j
     * @param res
     */
    private static void buildRes(int i, int j, StringBuilder res) {
        if(i == j) {
            res.append("k" + i + ": {d" + (i - 1) + ", d" + i + "}");
        } else {
            int k = root[i - 1][j - 1];
            res.append("k" + k + ": {");
            if(i <= k - 1) {
                buildRes(i, k - 1, res);
            } else {
                res.append("d" + (i-1));
            }
            res.append(", ");
            if(k + 1 <= j) {
                buildRes(k + 1, j, res);
            } else {
                res.append("d" + j);
            }
            res.append("}");
        }
    }
}
