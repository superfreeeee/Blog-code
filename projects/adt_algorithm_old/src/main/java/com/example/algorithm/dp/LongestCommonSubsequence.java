package com.example.algorithm.dp;

import java.util.Arrays;

/**
 * 動態規劃：LCS 問題（最長公共子序列）
 * 問題描述：
 *     尋找兩個字符串的最長公共子序列
 */
public class LongestCommonSubsequence {

    private static int[][] b, c;

    /**
     * 策略：
     *     分別找到 x, y 的前 (i, j) 子數組的 LCS，作為後一項的子結構
     * @param x
     * @param y
     * @return
     */
    public static int solve(String x, String y) {
        char[] s1 = x.toCharArray();
        char[] s2 = y.toCharArray();
        int m = s1.length, n = s2.length, i, j;
        b = new int[m][n];
        c = new int[m + 1][n + 1];

        for(i = 0 ; i <= m ; i++) {
            c[i][0] = 0;
        }
        for(j = 0 ; j <= n ; j++) {
            c[0][j] = 0;
        }
        for(i = 1 ; i <= m ; i++) {
            for(j = 1 ; j <= n ; j++) {
                if(s1[i - 1] == s2[j - 1]) {
                    c[i][j] = c[i - 1][j - 1] + 1;
                    b[i - 1][j - 1] = 3;
                } else if(c[i][j - 1] <= c[i - 1][j]) {
                    c[i][j] = c[i - 1][j];
                    b[i - 1][j - 1] = 2;
                } else {
                    c[i][j] = c[i][j - 1];
                    b[i - 1][j - 1] = 1;
                }
            }
        }
        return c[m][n];
    }

    /**
     * 重構解
     * @param x
     * @param y
     * @return
     */
    public static String buildLCS(String x, String y) {
        int res = solve(x, y);

        // x, y LCS 信息
        System.out.println("x: " + x);
        System.out.println("y: " + y);
        System.out.println("LCS length = " + res);
        System.out.println("b");

        // 打印 b 為最優解紀錄
        for(int[] i : b) {
            System.out.println(Arrays.toString(i));
        }
        // 打印 c 為最長子數組長度
        System.out.println("c");
        for(int[] i : c) {
            System.out.println(Arrays.toString(i));
        }

        StringBuilder s = new StringBuilder();
        buildLCS(x, y, x.length(), y.length(), s);
        System.out.println(s.toString());
        return s.toString();
    }

    /**
     * 重構解輔助方法
     * i or j == 0 表示一邊為空結束循環
     * case 3 表示最後一個字符相同，打印
     * case 2 表示繼承上面的長度
     * case 1 表示繼承左邊的長度
     * @param x
     * @param y
     * @param i
     * @param j
     * @param s
     */
    private static void buildLCS(String x, String y, int i, int j, StringBuilder s) {
        if(i == 0 || j == 0) {
            return;
        }
        switch (b[i - 1][j - 1]) {
            case 3:
                s.insert(0, x.charAt(i - 1));
                buildLCS(x, y, i - 1, j - 1, s);
                break;
            case 2:
                buildLCS(x, y, i - 1, j, s);
                break;
            case 1:
                buildLCS(x, y, i, j - 1, s);
                break;
        }
    }
}
