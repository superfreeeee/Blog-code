package com.example.algorithm.ga;

/**
 * 貪心算法：活動選擇問題
 * 問題描述：
 *     給定一組活動的開始和結束時間 s & f，選擇最大覆蓋組合（時間使用率最高）
 */
public class ActivitySelector {

    /**
     * 遞歸方法
     * @param s
     * @param f
     * @return
     */
    public static int[] solveRecursive(int[] s, int[] f) {
        int n = s.length;
        int[] A = new int[n];
        A[0] = 1;
        solve(s, f, 0, n - 1, A);
        return A;
    }

    /**
     * 遞歸方法主體
     * @param s
     * @param f
     * @param k
     * @param n
     * @param A
     */
    private static void solve(int[] s, int[] f, int k, int n, int[] A) {
        int m = k + 1;
        while(m <= n && s[m] < f[k]) {
            m++;
        }
        if(m <= n) {
            A[m] = 1;
            solve(s, f, m, n, A);
        }
    }

    /**
     * 迭代方法
     * @param s
     * @param f
     * @return
     */
    public static int[] solveGreedy(int[] s, int[] f) {
        int n = s.length;
        int[] A = new int[n];
        A[0] = 1;
        int k = 0;
        for(int m = 1 ; m < n ; m++) {
            if(s[m] >= f[k]) {
                A[m] = 1;
                k = m;
            }
        }
        return A;
    }
}
