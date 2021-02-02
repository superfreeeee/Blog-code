package com.example.algorithm.dp;

/**
 * 動態規劃：矩陣鏈乘法
 * 問題描述：
 *     給定矩陣乘法序列，找出最小代價的完全括號化方案
 */
public class MatrixChainMultiplication {

    /**
     * m(i, j) 表示 i ~ j 矩陣最優解
     * s(i, j) 紀錄分裂位置
     */
    private static int[][] m, s;

    /**
     * 同樣採取自底向上（從 n 小到 n 大）
     * 策略：
     *     將矩陣鏈從 k 處分裂成兩部分，各自為子結構最優解
     * @param p
     */
    public static void optimalOrder(int[] p) {
        int n = p.length - 1;
        m = new int[n][n];
        s = new int[n][n];

        for(int i = 0 ; i < n ; i++) {
            m[i][i] = 0;
        }
        for(int l = 2 ; l <= n ; l++) {
            for(int i = 1 ; i <= n - l + 1 ; i++) {
                int j = i + l - 1;
                m[i - 1][j - 1] = Integer.MAX_VALUE;
                for(int k = i ; k < j ; k++) {
                    int q = m[i - 1][k - 1] + m[k][j - 1] + p[i - 1] * p[k] * p[j];
                    if(q < m[i - 1][j - 1]) {
                        m[i - 1][j - 1] = q;
                        s[i - 1][j - 1] = k;
                    }
                }
            }
        }
    }

    /**
     * 打印並返回最優完全括號化方案
     * @return
     */
    public static String printOrder() {
        StringBuilder res = new StringBuilder();
        printOrder(1, m.length, res);
        System.out.println(res.toString());
        return res.toString();
    }

    private static void printOrder(int i, int j, StringBuilder res) {
        if(i == j) {
            res.append(i);
        } else {
            res.append("(");
            printOrder(i, s[i - 1][j - 1], res);
            printOrder(s[i - 1][j - 1] + 1, j, res);
            res.append(")");
        }
    }
}
