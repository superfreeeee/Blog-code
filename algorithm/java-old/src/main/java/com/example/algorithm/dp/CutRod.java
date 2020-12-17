package com.example.algorithm.dp;

/**
 * 動態規劃：切鋼條問題
 * 問題描述：
 *     給定鋼條收益數組 pi 表示長度為 i+1 時的收益，求長度 n 時的最大收益
 */
public class CutRod {

    /**
     * r 表示結果序列，即各長度最大收益
     * s 紀錄切割方式
     * p 為單條鋼條收益
     */
    private static int[] r;
    private static int[] s;
    private static int[] p;

    /**
     * 自頂向上的動態規劃方法
     * 策略：
     *     將長度 n 切割 i，剩餘的 j - i 為子結構的最優解
     * @param p
     * @param n
     * @return
     */
    public static int bottomUpSolution(int[] p, int n) {
        CutRod.p = p;
        r = new int[n + 1];
        s = new int[n + 1];
        r[0] = s[0] = 0;

        for(int j = 1 ; j <= n ; j++) {
            int q = Integer.MIN_VALUE;
            for(int i = 1 ; i <= j ; i++) {
                if(q < p[i - 1] + r[j - i]) {
                    q = p[i - 1] + r[j - i];
                    s[j] = i;
                }
            }
            r[j] = q;
        }
        return r[n];
    }

    /**
     * 打印過程所有切割方案
     * @param n
     */
    public static void printSolution(int n) {
        for(int i = 0 ; i <= n ; i++) {
            System.out.printf(" s[%2d]", i);
        }
        System.out.println();

        for(int i = 0 ; i <= n ; i++) {
            System.out.printf("%6d", s[i]);
        }
        System.out.println();
    }

    /**
     * 構造最優解
     * @param n
     */
    public static void buildSolution(int n) {
        System.out.print("Solution s[" + n + "] = " + r[n] + " = ");
        while(n > 0) {
            System.out.print(s[n] + "(" + p[s[n] - 1] + ")");
            n -= s[n];
            if(n > 0) {
                System.out.print(" + ");
            }
        }
    }

}
